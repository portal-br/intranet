from collections.abc import Callable
from portalbrasil.intranet import PACKAGE_NAME
from Products.GenericSetup.tool import SetupTool

import pytest


@pytest.fixture(scope="module")
def base_profile_id() -> str:
    """Return the base profile ID of the package."""
    return f"{PACKAGE_NAME}:base"


@pytest.fixture(scope="module")
def list_upgrades(base_profile_id) -> Callable[[SetupTool, str, str], list]:
    """Return a helper that lists the upgrade steps between two versions."""
    from Products.GenericSetup.upgrade import listUpgradeSteps

    def _list_upgrades(setup_tool: SetupTool, source: str, dest: str) -> list:
        """List the upgrade steps registered for the base profile."""
        return listUpgradeSteps(setup_tool, base_profile_id, source, dest)

    return _list_upgrades


class TestUpgrades:
    @pytest.fixture(autouse=True)
    def _setup(self, portal_class, current_versions) -> None:
        """Bind the site, its setup tool and the base version to the test."""
        self.portal = portal_class
        self.setup_tool: SetupTool = portal_class.portal_setup
        self.version = current_versions.base

    @pytest.mark.parametrize(
        "src_version",
        [],
    )
    def test_upgrade_to_latest(self, list_upgrades, src_version: str) -> None:
        """Test that the upgrade step to the latest version is available."""

        upgrades = list_upgrades(self.setup_tool, src_version, self.version)
        assert len(upgrades) > 0, (
            f"No upgrade path found from {src_version} to {self.version}"
        )
