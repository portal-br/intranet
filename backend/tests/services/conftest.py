from collections.abc import Callable
from collections.abc import Generator
from plone.app.testing import SITE_OWNER_NAME
from plone.app.testing import SITE_OWNER_PASSWORD
from plone.restapi.testing import RelativeSession

import pytest


@pytest.fixture()
def portal(functional) -> Generator:
    """Yield the function-scoped Plone site."""
    yield functional["portal"]


@pytest.fixture(scope="class")
def portal_class(functional_portal_class) -> Generator:
    """Yield the class-scoped Plone site."""
    yield functional_portal_class


@pytest.fixture()
def request_api_factory(portal) -> Callable[[], RelativeSession]:
    """Return a helper that builds a REST API session bound to the site."""

    def factory() -> RelativeSession:
        """Build a REST API session targeting the ``++api++`` traverser."""
        url = portal.absolute_url()
        api_session = RelativeSession(f"{url}/++api++")
        return api_session

    return factory


@pytest.fixture()
def api_anon_request(request_api_factory) -> Generator[RelativeSession]:
    """Yield an anonymous REST API session."""
    request = request_api_factory()
    yield request


@pytest.fixture()
def api_manager_request(request_api_factory) -> Generator[RelativeSession]:
    """Yield a REST API session authenticated as the site owner (Manager)."""
    request = request_api_factory()
    request.auth = (SITE_OWNER_NAME, SITE_OWNER_PASSWORD)
    yield request
    request.auth = ()
