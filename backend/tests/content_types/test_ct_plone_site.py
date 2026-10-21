from plone.behavior.interfaces import IBehavior
from plone.dexterity.fti import DexterityFTI
from zope.component import queryUtility

import pytest


class TestContentTypeFTI:
    portal_type: str = "Plone Site"

    @pytest.fixture(autouse=True)
    def _setup(self, portal, get_fti) -> None:
        """Bind the site and the FTI of the type under test to the instance."""
        self.portal = portal
        self.fti: DexterityFTI = get_fti(self.portal_type)

    @pytest.mark.parametrize(
        "attr,expected",
        [
            ("title", "Plone Site"),
            ("klass", "Products.CMFPlone.Portal.PloneSite"),
            ("global_allow", False),
        ],
    )
    def test_fti(self, attr: str, expected):
        """Test FTI values."""
        fti = self.fti

        assert isinstance(fti, DexterityFTI)
        assert getattr(fti, attr) == expected

    @pytest.mark.parametrize(
        "idx,behavior",
        enumerate((
            "plonegovbr.socialmedia.settings",
            "sc.voltolighttheme.themeselector",
            "sc.voltolighttheme.intranetheader",
            "sc.voltolighttheme.footer",
            "volto.preview_image_link",
            "plone.basic",
            "plone.categorization",
            "plone.relateditems",
            "plone.locking",
            "plone.excludefromnavigation",
            "volto.blocks",
            "kitconcept.sticky_menu",
        )),
    )
    def test_behaviors(self, idx: int, behavior: str):
        """Test behaviors are present and in correct order."""
        assert self.fti.behaviors[idx] == behavior

    def test_behaviors_registered(self):
        """Every behavior of the FTI is still provided by an installed package."""
        missing = [
            name
            for name in self.fti.behaviors
            if queryUtility(IBehavior, name=name) is None
        ]
        assert missing == []

    @pytest.mark.parametrize(
        "field_name",
        [
            "footer_colophon_text",
            "footer_colophon_right_text",
        ],
    )
    def test_footer_fields(self, field_name: str):
        """The footer behavior of the site has both colophon texts."""
        behavior = queryUtility(IBehavior, name="sc.voltolighttheme.footer")
        assert field_name in behavior.interface.names()
