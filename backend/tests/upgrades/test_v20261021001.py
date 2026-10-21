"""Upgrade to 20261021001: Plone 6.2.2 and sc.voltolighttheme 1.0.0a12."""

from . import PROFILE
from plone import api
from plone.registry.interfaces import IRegistry
from portalbrasil.intranet.upgrades.v20261021001 import CONTENT_TYPE_COLORS
from portalbrasil.intranet.upgrades.v20261021001 import SMALL_VARIANT_SIZES
from Products.GenericSetup.tool import SetupTool
from sc.voltolighttheme.utils import themes
from zope.component import getUtility

import pytest


SOURCE = "20260824001"
DESTINATION = "20261021001"


class TestUpgrade:
    """The steps from ``20260824001`` to ``20261021001``."""

    @pytest.fixture(autouse=True)
    def _setup(self, portal, setup_tool: SetupTool) -> None:
        """Put the site back at the source version."""
        self.portal = portal
        self.setup_tool = setup_tool
        self.registry = getUtility(IRegistry)
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
        """The site at the source version is offered exactly these steps."""
        steps = self._steps()

        assert {(s["ssource"], s["sdest"]) for s in steps} == {(SOURCE, DESTINATION)}
        assert len(steps) == 3

    def test_upgrades_socialmedia(self):
        """plonegovbr.socialmedia reaches 1001 and gets its catalog column."""
        catalog = api.portal.get_tool("portal_catalog")
        catalog.delColumn("social_links")
        self.setup_tool.setLastVersionForProfile(
            "plonegovbr.socialmedia:default", "1000"
        )

        self._run()

        assert self.setup_tool.getLastVersionForProfile(
            "plonegovbr.socialmedia:default"
        ) == ("1001",)
        assert "social_links" in catalog.schema()

    @pytest.mark.parametrize(
        "profile_id",
        [
            "plonegovbr.socialmedia:default",
            "sc.voltolighttheme:default",
        ],
    )
    def test_dependencies_are_current(self, profile_id: str):
        """No dependency is left with a pending upgrade."""
        self._run()

        assert self.setup_tool.listUpgrades(profile_id) == []

    def test_keeps_kitconcept_voltolighttheme_uninstalled(self):
        """The kitconcept theme profile, removed by sc.voltolighttheme, stays out."""
        self._run()

        assert (
            self.setup_tool.getLastVersionForProfile(
                "kitconcept.voltolighttheme:default"
            )
            == "unknown"
        )

    def test_adds_sizes_to_small_variant(self):
        """The default small picture variant gets the Plone 6.2.2 sizes."""
        variants = api.portal.get_registry_record("plone.picture_variants")
        variants["small"]["sourceset"][0].pop("sizes", None)
        api.portal.set_registry_record("plone.picture_variants", variants)

        self._run()

        variants = api.portal.get_registry_record("plone.picture_variants")
        assert variants["small"]["sourceset"][0]["sizes"] == SMALL_VARIANT_SIZES

    def test_keeps_customized_small_variant(self):
        """A customized small picture variant is left alone."""
        variants = api.portal.get_registry_record("plone.picture_variants")
        sourceset = variants["small"]["sourceset"][0]
        sourceset.pop("sizes", None)
        sourceset["additionalScales"] = ["large"]
        api.portal.set_registry_record("plone.picture_variants", variants)

        self._run()

        variants = api.portal.get_registry_record("plone.picture_variants")
        assert "sizes" not in variants["small"]["sourceset"][0]
        assert variants["small"]["sourceset"][0]["additionalScales"] == ["large"]

    def _drop_color_records(self, theme_id: str) -> None:
        """Remove the content-type color records, as before 1.0.0a6."""
        for name in CONTENT_TYPE_COLORS:
            del self.registry.records[themes.record_name(theme_id, name)]

    @pytest.mark.parametrize("name,value", CONTENT_TYPE_COLORS.items())
    def test_adds_colors_to_default_theme(self, name: str, value: str):
        """The default theme gets the content-type color records and values."""
        self._drop_color_records(themes.DEFAULT_THEME_ID)

        self._run()

        assert themes.theme_values(themes.DEFAULT_THEME_ID)[name] == value

    def test_keeps_default_theme_values(self):
        """Values already stored on the default theme are kept."""
        self._drop_color_records(themes.DEFAULT_THEME_ID)
        themes.update_theme(themes.DEFAULT_THEME_ID, {"primary_color_light": "#123456"})

        self._run()

        values = themes.theme_values(themes.DEFAULT_THEME_ID)
        assert values["primary_color_light"] == "#123456"

    def test_keeps_colors_set_on_the_site(self):
        """A content-type color chosen on the site is not overwritten."""
        themes.update_theme(themes.DEFAULT_THEME_ID, {"event_color_light": "#000000"})

        self._run()

        values = themes.theme_values(themes.DEFAULT_THEME_ID)
        assert values["event_color_light"] == "#000000"

    def test_adds_records_to_custom_theme(self):
        """A theme created on the site gets the records, left unset."""
        themes.create_theme(
            "custom", {"name": "Custom", "primary_color_light": "#abcdef"}
        )
        self._drop_color_records("custom")

        self._run()

        values = themes.theme_values("custom")
        assert {name: values[name] for name in CONTENT_TYPE_COLORS} == dict.fromkeys(
            CONTENT_TYPE_COLORS
        )
        assert values["primary_color_light"] == "#abcdef"

    def test_leaves_other_records_alone(self):
        """It sets records directly rather than re-importing the registry."""
        api.portal.set_registry_record("plone.site_title", "Changed here")

        self._run()

        assert api.portal.get_registry_record("plone.site_title") == "Changed here"

    def test_reaches_destination(self):
        """After the steps, the profile is at the destination version."""
        for step in self._steps():
            step["step"].doStep(self.setup_tool)
            self.setup_tool.setLastVersionForProfile(PROFILE, step["dest"])

        assert self.setup_tool.getLastVersionForProfile(PROFILE) == (DESTINATION,)
