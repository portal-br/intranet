from collections.abc import Callable
from plone import api

import json
import pytest


KEY = "pas.plugins.authomatic.interfaces.IPasPluginsAuthomaticSettings.json_config"


@pytest.fixture(scope="session")
def authomatic_config() -> Callable[[], dict]:
    """Return a helper that reads the Authomatic JSON config from the registry."""

    def func() -> dict:
        """Return the decoded Authomatic JSON configuration."""
        return json.loads(api.portal.get_registry_record(KEY))

    return func
