from collections.abc import Callable
from dataclasses import dataclass
from plone import api
from portalbrasil.intranet.testing import ACCEPTANCE_TESTING
from portalbrasil.intranet.testing import FUNCTIONAL_TESTING
from portalbrasil.intranet.testing import INTEGRATION_TESTING
from Products.CMFPlone.Portal import PloneSite
from pytest_plone import fixtures_factory
from typing import Any

import pytest


pytest_plugins = ["pytest_plone"]


globals().update(
    fixtures_factory((
        (ACCEPTANCE_TESTING, "acceptance"),
        (FUNCTIONAL_TESTING, "functional"),
        (INTEGRATION_TESTING, "integration"),
    ))
)


@pytest.fixture
def traverse() -> Callable[[dict | list, str | list[str]], Any]:
    """Return a helper to read a value from a nested JSON structure by path."""

    def func(data: dict | list, path: str | list[str]) -> Any:
        """Traverse ``data`` following ``path``, optionally applying an operation.

        :param data: Nested mapping/sequence to traverse.
        :param path: Slash-separated path, optionally prefixed with ``op:`` where
            ``op`` is one of ``len``, ``type``, ``is_uuid4`` or ``keys``.
        :returns: The value found at ``path``, transformed by ``op`` when given.
        """
        op = None
        path = path.split(":") if isinstance(path, str) else path
        if len(path) == 2:
            op, path = path
        else:
            path = path[0]
        parts: list[str | int] = [part for part in path.split("/") if part.strip()]
        value = data
        for part in parts:
            if isinstance(value, list) and isinstance(part, str):
                part = int(part)
            value = value[part]
        match op:
            # Add other functions here
            case "len":
                value = len(value)
            case "type":
                # This makes it easier to compare
                value = type(value).__name__
            case "is_uuid4":
                value = len(value) == 32 and value[15] == "4"
            case "keys":
                value = list(value.keys())
        return value

    return func


@dataclass
class CurrentVersions:
    base: str
    default: str
    package: str


@pytest.fixture(scope="session")
def current_versions() -> CurrentVersions:
    """Return the package, base and default profile versions under test."""
    from portalbrasil.intranet import __version__

    return CurrentVersions(
        base="20260723001",
        default="1000",
        package=__version__,
    )


@pytest.fixture(scope="session")
def distribution_name() -> str:
    """Return the name of the distribution used to create test sites."""
    return "portalbrasil-intranet"


@pytest.fixture(scope="session")
def prepare_answers() -> Callable[[], dict]:
    """Return a helper that builds the default site-creation answers."""

    def func() -> dict:
        """Build a fresh copy of the default site-creation answers."""
        return {
            "site_id": "intranet",
            "title": "Portal Brasil: Intranet",
            "description": "Intranet desenvolvida com Portal Brasil",
            "available_languages": ["pt-br"],
            "default_language": "pt-br",
            "portal_timezone": "America/Sao_Paulo",
            "setup_content": True,
            "demo_content": False,
            "authentication": {"provider": "internal"},
        }

    return func


@pytest.fixture(scope="session")
def answers(prepare_answers) -> dict:
    """Return the default site-creation answers."""
    return prepare_answers()


@pytest.fixture(scope="session")
def create_site(distribution_name, site_owner_name) -> Callable[..., PloneSite]:
    """Return a helper that creates (replacing any existing) a Plone site."""
    from plone.distribution.api import site as site_api
    from zope.component.hooks import setSite

    def func(app, answers: dict) -> PloneSite:
        """Create a site from ``answers``, deleting a homonymous one first."""
        with api.env.adopt_user(site_owner_name):
            site_id = answers.get("site_id")
            if site_id and (site_id in app.objectIds()):
                app.manage_delObjects(site_id)
            site = site_api._create_site(
                app, distribution_name=distribution_name, answers=answers
            )
            setSite(site)
        return site

    return func
