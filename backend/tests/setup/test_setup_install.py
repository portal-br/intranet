from portalbrasil.intranet import PACKAGE_NAME
from Products.CMFPlone.TypesTool import TypesTool
from Products.GenericSetup.tool import SetupTool

import pytest


class TestSetupInstall:
    @pytest.fixture(autouse=True)
    def _setup(self, current_versions) -> None:
        """Bind the base and default profile versions to the test instance."""
        self.profile_version: str = current_versions.base
        self.default_profile_version: str = current_versions.default

    def test_browserlayer(self, browser_layers):
        """Test that IBrowserLayer is registered."""
        from portalbrasil.intranet.interfaces import IBrowserLayer

        assert IBrowserLayer in browser_layers

    def test_latest_version(self, profile_last_version):
        """Test latest version of default profile."""
        assert profile_last_version(f"{PACKAGE_NAME}:base") == self.profile_version

    def test_base_profile(self, setup_tool):
        """Test if we have the base profile."""
        assert setup_tool.getBaselineContextID() == f"profile-{PACKAGE_NAME}:base"

    def test_dependencies_version(self, profile_last_version):
        """Test latest version of dependencies profile."""
        assert (
            profile_last_version(f"{PACKAGE_NAME}:default")
            == self.default_profile_version
        )


class TestSetupDependencies:
    @pytest.fixture(autouse=True)
    def _setup(self, portal_class) -> None:
        """Bind the site and its setup and types tools to the test instance."""
        self.portal = portal_class
        self.setup_tool: SetupTool = portal_class.portal_setup
        self.types_tool: TypesTool = portal_class.portal_types

    @pytest.mark.parametrize(
        "profile",
        [
            "Products.MimetypesRegistry:MimetypesRegistry",
            "Products.PortalTransforms:PortalTransforms",
            "Products.CMFEditions:CMFEditions",
            "Products.PlonePAS:PlonePAS",
            "plone.app.linkintegrity:default",
            "plone.app.registry:default",
            "plone.app.theming:default",
            "plone.app.users:default",
            # plone.outputfilters:default is applied too, but its profile has no
            # metadata.xml, so GenericSetup never records a version for it.
            "plone.protect:default",
            "plone.staticresources:default",
            "plone.app.contenttypes:default",
            "plone.restapi:default",
            "plone.volto:default",
            "plonetheme.barceloneta:default",
            "sc.voltolighttheme:default",
            "sc.voltolighttheme:intranet",
            "plone.formblock:default",
            "plonegovbr.socialmedia:default",
        ],
    )
    def test_installed(self, profile: str):
        """Test if a profile is installed.

        ``getLastVersionForProfile`` returns ``"unknown"``, never ``None``,
        for a profile that was not installed.
        """
        assert self.setup_tool.getLastVersionForProfile(profile) != "unknown"

    @pytest.mark.parametrize(
        "profile",
        [
            "collective.volto.formsupport:default",
            # Uninstalled by the sc.voltolighttheme 1001 upgrade step.
            "kitconcept.voltolighttheme:default",
            "sc.voltolighttheme:uninstall",
        ],
    )
    def test_uninstalled(self, profile: str):
        """Test if a profile is not installed."""
        assert self.setup_tool.getLastVersionForProfile(profile) == "unknown"
