"""Upgrade to 20261111001: Plone 6.2.3, sc.voltolighttheme 1.0.0a15 and Volto 19.7.0."""

from . import PROFILE
from portalbrasil.intranet.upgrades.v20261111001 import DEPENDENCIES
from Products.GenericSetup.tool import SetupTool

import pytest


SOURCE = "20261021001"
DESTINATION = "20261111001"


class TestUpgrade:
    """The step from ``20261021001`` to ``20261111001``."""

    @pytest.fixture(autouse=True)
    def _setup(self, portal, setup_tool: SetupTool) -> None:
        """Put the site back at the source version."""
        self.setup_tool = setup_tool
        setup_tool.setLastVersionForProfile(PROFILE, SOURCE)

    def _steps(self) -> list[dict]:
        """Return the upgrade steps available from the source version.

        ``listUpgrades`` gives the steps of an ``upgradeSteps`` group as one
        list, and a lone ``upgradeStep`` as a bare info.
        """
        steps: list[dict] = []
        for entry in self.setup_tool.listUpgrades(PROFILE):
            steps.extend(entry if isinstance(entry, list) else [entry])
        return steps

    def _run(self) -> None:
        """Run every step offered from the source version."""
        for step in self._steps():
            step["step"].doStep(self.setup_tool)

    def test_available(self):
        """The site at the source version is offered exactly this step."""
        steps = self._steps()

        assert [(s["ssource"], s["sdest"]) for s in steps] == [(SOURCE, DESTINATION)]

    def test_upgrades_dependencies(self, monkeypatch: pytest.MonkeyPatch):
        """Each add-on profile of the step is upgraded through portal_setup."""
        upgraded: list[str] = []
        original = SetupTool.upgradeProfile

        def spy(self, profile_id, *args, **kwargs):
            upgraded.append(profile_id)
            return original(self, profile_id, *args, **kwargs)

        monkeypatch.setattr(SetupTool, "upgradeProfile", spy)

        self._run()

        assert upgraded == list(DEPENDENCIES)

    @pytest.mark.parametrize("profile_id", DEPENDENCIES)
    def test_dependencies_are_current(self, profile_id: str):
        """No dependency is left with a pending upgrade."""
        self._run()

        assert self.setup_tool.listUpgrades(profile_id) == []
