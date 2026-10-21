from portalbrasil.intranet.upgrades.v20261021001 import CONTENT_TYPE_COLORS
from sc.voltolighttheme.utils import themes

import pytest


class TestSetupThemes:
    @pytest.fixture(autouse=True)
    def _setup(self, portal_class) -> None:
        """Bind the class-scoped Plone site to the test instance."""
        self.portal = portal_class

    def test_default_theme_name(self):
        """The intranet overrides the default theme of sc.voltolighttheme."""
        assert themes.theme_title(themes.DEFAULT_THEME_ID) == "Intranet Default"

    @pytest.mark.parametrize("name,value", CONTENT_TYPE_COLORS.items())
    def test_default_theme_content_type_colors(self, name: str, value: str):
        """A new site has the same content-type colors the upgrade sets."""
        assert themes.theme_settings(themes.DEFAULT_THEME_ID)[name] == value

    @pytest.mark.parametrize(
        "name,value",
        [
            ("primary_accent_color_light", "#009c3b"),
            ("secondary_accent_color_light", "#002671"),
            ("accent_color_light", "#ffe122"),
        ],
    )
    def test_default_theme_brand_colors(self, name: str, value: str):
        """The default theme keeps the intranet brand colors."""
        assert themes.theme_settings(themes.DEFAULT_THEME_ID)[name] == value
