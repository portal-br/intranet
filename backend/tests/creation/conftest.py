from collections.abc import Generator
from Products.CMFPlone.Portal import PloneSite

import pytest


@pytest.fixture(scope="class")
def portal(app_class, create_site, answers) -> Generator[PloneSite]:
    """Yield a freshly created Plone site for site-creation tests."""
    site = create_site(app=app_class, answers=answers)
    yield site
