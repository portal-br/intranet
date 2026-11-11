"""Upgrade to 20261111001: Plone 6.2.3, sc.voltolighttheme 1.0.0a15 and Volto 19.7.0."""

from . import PROFILE
from plone.registry.interfaces import IRegistry
from portalbrasil.intranet.upgrades.v20261111001 import CORE_PROFILES
from portalbrasil.intranet.upgrades.v20261111001 import DEPENDENCIES
from Products.GenericSetup.tool import SetupTool
from zope.component import getUtility

import pytest


SOURCE = "20261021001"
DESTINATION = "20261111001"
CORE_TITLE = "Apply the Plone 6.2.3 upgrade steps"
CURRENTUID_PREFIX = "plone.app.querystring.operation.string.currentUID"
CURRENTUID_OPERATION = f"{CURRENTUID_PREFIX}.operation"
CURRENTUID_VALUE = "plone.app.querystring.queryparser._currentUID"
PATH_SORTABLE_RECORD = "plone.app.querystring.field.path.sortable"


class TestUpgrade:
    """The step from ``20261021001`` to ``20261111001``."""

    @pytest.fixture(autouse=True)
    def _setup(self, portal, setup_tool: SetupTool) -> None:
        """Put the site back at the source version, as a Plone 6.2.2 site."""
        self.portal = portal
        self.setup_tool = setup_tool
        setup_tool.setLastVersionForProfile(PROFILE, SOURCE)
        setup_tool.setLastVersionForProfile("Products.CMFPlone:plone", "6205")

    def _steps(self) -> list[dict]:
        """Return the upgrade steps available from the source version.

        ``listUpgrades`` gives the steps of an ``upgradeSteps`` group as one
        list, and a lone ``upgradeStep`` as a bare info.
        """
        steps: list[dict] = []
        for entry in self.setup_tool.listUpgrades(PROFILE):
            steps.extend(entry if isinstance(entry, list) else [entry])
        return steps

    def _run(self, title: str | None = None) -> None:
        """Run the steps offered from the source version, optionally one by title."""
        for step in self._steps():
            if title is None or step["title"] == title:
                step["step"].doStep(self.setup_tool)

    def test_available(self):
        """The site at the source version is offered exactly these two steps."""
        steps = self._steps()

        assert [(s["ssource"], s["sdest"]) for s in steps] == [
            (SOURCE, DESTINATION),
            (SOURCE, DESTINATION),
        ]

    def test_upgrades_profiles_in_order(self, monkeypatch: pytest.MonkeyPatch):
        """Core profiles are upgraded first, then the add-on profiles."""
        upgraded: list[str] = []
        original = SetupTool.upgradeProfile

        def spy(self, profile_id, *args, **kwargs):
            upgraded.append(profile_id)
            return original(self, profile_id, *args, **kwargs)

        monkeypatch.setattr(SetupTool, "upgradeProfile", spy)

        self._run()

        assert upgraded == [*CORE_PROFILES, *DEPENDENCIES]

    @pytest.mark.parametrize("profile_id", [*CORE_PROFILES, *DEPENDENCIES])
    def test_profiles_are_current(self, profile_id: str):
        """No upgraded profile is left with a pending upgrade."""
        self._run()

        assert self.setup_tool.listUpgrades(profile_id) == []

    def test_core_querystring_16(self):
        """plone.app.querystring 15 -> 16 adds currentUID and a sortable path."""
        registry = getUtility(IRegistry)
        self.setup_tool.setLastVersionForProfile("plone.app.querystring:default", "15")
        for name in [k for k in registry.records if k.startswith(CURRENTUID_PREFIX)]:
            del registry.records[name]
        registry[PATH_SORTABLE_RECORD] = False
        assert CURRENTUID_OPERATION not in registry.records

        self._run(CORE_TITLE)

        assert registry[CURRENTUID_OPERATION] == CURRENTUID_VALUE
        assert registry[PATH_SORTABLE_RECORD] is True

    def test_core_volto_1102(self):
        """plone.volto 1101 -> 1102 adds the personal tools of the toolbar."""
        category = self.portal.portal_actions.personal_tools
        self.setup_tool.setLastVersionForProfile("plone.volto:default", "1101")
        if "profile" in category.objectIds():
            category.manage_delObjects(["profile"])
        assert "profile" not in category.objectIds()

        self._run(CORE_TITLE)

        assert "profile" in category.objectIds()

    def test_core_cmfplone_6206(self):
        """Products.CMFPlone 6205 -> 6206 is applied by the core step."""
        self.setup_tool.setLastVersionForProfile("Products.CMFPlone:plone", "6205")

        self._run(CORE_TITLE)

        assert self.setup_tool.getLastVersionForProfile("Products.CMFPlone:plone") == (
            "6206",
        )
