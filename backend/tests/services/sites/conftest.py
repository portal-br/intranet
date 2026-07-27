from collections.abc import Callable
from collections.abc import Generator
from plone.restapi.testing import RelativeSession

import pytest


@pytest.fixture()
def app(functional) -> Generator:
    """Yield the Zope application root."""
    yield functional["app"]


@pytest.fixture()
def request_api_factory(app) -> Callable[[], RelativeSession]:
    """Return a helper that builds a JSON REST API session at the app root."""

    def factory() -> RelativeSession:
        """Build a REST API session accepting ``application/json``."""
        url = app.absolute_url()
        api_session = RelativeSession(url)
        api_session.headers.update({"Accept": "application/json"})
        return api_session

    return factory
