"""The whole upgrade path of the base profile."""

from . import PROFILE
from Products.GenericSetup.tool import SetupTool

import pytest


class TestUpgradePath:
    @pytest.fixture(autouse=True)
    def _setup(self, portal, setup_tool: SetupTool, current_versions) -> None:
        """Bind the setup tool and the current base version to the test."""
        self.setup_tool = setup_tool
        self.version = current_versions.base

    @pytest.mark.parametrize("source", ["20260723001", "20260824001"])
    def test_upgrade_to_latest(self, source: str):
        """A site at an older version upgrades to the current one."""
        self.setup_tool.setLastVersionForProfile(PROFILE, source)

        self.setup_tool.upgradeProfile(PROFILE)

        assert self.setup_tool.getLastVersionForProfile(PROFILE) == (self.version,)
        assert self.setup_tool.listUpgrades(PROFILE) == []
