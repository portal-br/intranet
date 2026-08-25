from plone.base.interfaces import IAddonList
from plone.base.interfaces.installable import INonInstallable
from plone.distribution.api import site as site_api
from portalbrasil.intranet import CMF_DEPENDENCIES_PROFILE
from portalbrasil.intranet import DEFAULT_PROFILE
from portalbrasil.intranet import INTRANET_PROFILE
from portalbrasil.intranet import PACKAGE_NAME
from Products.CMFPlone.MigrationTool import Addon
from Products.CMFPlone.MigrationTool import AddonList
from zope.component.hooks import setSite
from zope.interface import implementer


_PLONE_PACKAGES = [
    "borg.localrole",
    "CMFDefault",
    "CMFDiffTool",
    "CMFEditions",
    "CMFPlone",
    "CMFTopic",
    "CMFUid",
    "DCWorkflow",
    "MimetypesRegistry",
    "PasswordResetTool",
    "plone.app.caching",
    "plone.app.dexterity",
    "plone.app.discussion",
    "plone.app.event",
    "plone.app.intid",
    "plone.app.iterate",
    "plone.app.layout",
    "plone.app.linkintegrity",
    "plone.app.multilingual",
    "plone.app.querystring",
    "plone.app.referenceablebehavior",
    "plone.app.registry",
    "plone.app.relationfield",
    "plone.app.theming",
    "plone.app.users",
    "plone.app.z3cform",
    "plone.formwidget.recurrence",
    "plone.keyring",
    "plone.outputfilters",
    "plone.portlet.collection",
    "plone.portlet.static",
    "plone.protect",
    "plone.resource",
    "plone.restapi",
    "plone.session",
    "plone.volto",
    "PloneLanguageTool",
    "PlonePAS",
    "plonetheme.barceloneta",
    "PortalTransforms",
    "Products.CMFDefault",
    "Products.CMFDiffTool",
    "Products.CMFEditions",
    "Products.CMFPlacefulWorkflow",
    "Products.CMFPlone.migrations",
    "Products.CMFPlone",
    "Products.CMFTopic",
    "Products.CMFUid",
    "Products.DCWorkflow",
    "Products.MimetypesRegistry",
    "Products.NuPlone",
    "Products.PasswordResetTool",
    "Products.PloneLanguageTool",
    "Products.PlonePAS",
    "Products.PortalTransforms",
]

_INTRANET_DEPENDENCIES = [
    "collective.bookmarks",
    "collective.contact_behaviors",
    "collective.person",
    "collective.volto.otp",
    "kitconcept.voltolighttheme",
    "pas.plugins.authomatic",
    "pas.plugins.keycloakgroups",
    "pas.plugins.oidc",
    "plone.formblock",
    "plonegovbr.brfields",
    "plonegovbr.socialmedia",
    "sc.voltolighttheme",
    "souper.plone",
]

_DEPENDENCIES_PROFILES = [
    "borg.localrole:default",
    "collective.bookmarks:default",
    "kitconcept.voltolighttheme:default",
    "kitconcept.voltolighttheme:demo",
    "sc.voltolighttheme:default",
    "sc.voltolighttheme:intranet",
    "plone.app.contenttypes:default",
    "plone.app.dexterity:default",
    "plone.app.event:default",
    "plone.app.linkintegrity:default",
    "plone.app.registry:default",
    "plone.app.relationfield:default",
    "plone.app.theming:default",
    "plone.app.users:default",
    "plone.app.versioningbehavior:default",
    "plone.app.z3cform:default",
    "plone.browserlayer:default",
    "plone.formblock:default",
    "plone.formwidget.recurrence:default",
    "plone.keyring:default",
    "plone.outputfilters:default",
    "plone.portlet.collection:default",
    "plone.portlet.static:default",
    "plone.protect:default",
    "plone.resource:default",
    "plone.restapi:default",
    "plone.volto:default",
    "plonegovbr.brfields:default",
    "plonegovbr.socialmedia:demo",
    "Products.CMFDiffTool:CMFDiffTool",
    "Products.CMFEditions:CMFEditions",
    "Products.CMFPlone:dependencies",
    "Products.CMFPlone:testfixture",
    "Products.MimetypesRegistry:MimetypesRegistry",
    "Products.NuPlone:uninstall",
    "Products.PasswordResetTool:PasswordResetTool",
    "Products.PloneLanguageTool:PloneLanguageTool",
    "Products.PlonePAS:PlonePAS",
    "Products.PortalTransforms:PortalTransforms",
]


@implementer(INonInstallable)
class HiddenProfiles:
    def getNonInstallableProducts(self):
        return [PACKAGE_NAME, *_INTRANET_DEPENDENCIES, *_PLONE_PACKAGES]

    def getNonInstallableProfiles(self):
        """Hide uninstall profile from site-creation and quickinstaller."""
        return [
            DEFAULT_PROFILE,
            CMF_DEPENDENCIES_PROFILE,
            INTRANET_PROFILE,
            *_DEPENDENCIES_PROFILES,
        ]


@implementer(IAddonList)
class LocalAddonList:
    addon_list: AddonList = AddonList([
        Addon(profile_id="Products.CMFEditions:CMFEditions"),
        Addon(
            profile_id="Products.CMFPlacefulWorkflow:CMFPlacefulWorkflow",
            check_module="Products.CMFPlacefulWorkflow",
        ),
        Addon(profile_id="Products.PlonePAS:PlonePAS"),
        Addon(profile_id="plone.app.caching:default", check_module="plone.app.caching"),
        Addon(profile_id="plone.app.contenttypes:default"),
        Addon(profile_id="plone.app.dexterity:default"),
        Addon(
            profile_id="plone.app.discussion:default",
            check_module="plone.app.discussion",
        ),
        Addon(profile_id="plone.app.event:default"),
        Addon(profile_id="plone.app.iterate:default", check_module="plone.app.iterate"),
        Addon(
            profile_id="plone.app.multilingual:default",
            check_module="plone.app.multilingual",
        ),
        Addon(profile_id="plone.app.querystring:default"),
        Addon(profile_id="plone.app.theming:default"),
        Addon(profile_id="plone.app.users:default"),
        Addon(profile_id="plone.restapi:default"),
        Addon(profile_id="plone.session:default"),
        Addon(profile_id="plone.staticresources:default"),
        Addon(profile_id="plone.volto:default"),
        Addon(profile_id="plonetheme.barceloneta:default"),
        Addon(profile_id="kitconcept.voltolighttheme:default"),
        Addon(profile_id="collective.bookmarks:default"),
        Addon(profile_id="collective.contact_behaviors:default"),
        Addon(profile_id="collective.person:default"),
        Addon(profile_id="plonegovbr.socialmedia:default"),
        Addon(profile_id="portalbrasil.intranet:default"),
        Addon(profile_id="plone.formblock:default"),
    ])


def add_site(
    context,
    site_id: str,
    title: str = "kitconcept: Site",
    description: str = "",
    profile_id: str = DEFAULT_PROFILE,
    snapshot: bool = False,
    content_profile_id: str | None = None,
    extension_ids: tuple[str, ...] = (),
    setup_content: bool = False,
    available_languages: list[str] | None = None,
    default_language: str = "de",
    portal_timezone: str = "UTC",
    distribution: str = "volto",
    **kwargs,
):
    """Add a PloneSite to the context.

    We maintain the same signature used in `Products.CMFPlone.factory.addPloneSite`
    to ensure compatibility with existing scripts
    """
    # Set available languages to default language if not provided
    if not available_languages:
        available_languages = [default_language]
    # Pass all arguments and keyword arguments in the answers,
    # But the 'distribution_name' is not needed there.
    answers = {
        "site_id": site_id,
        "title": title,
        "description": description,
        "profile_id": profile_id,
        "snapshot": snapshot,
        "content_profile_id": content_profile_id,
        "extension_ids": extension_ids,
        "setup_content": setup_content,
        "available_languages": available_languages,
        "default_language": default_language,
        "portal_timezone": portal_timezone,
    }
    answers.update(kwargs)
    site = site_api._create_site(
        context=context,
        distribution_name=distribution,
        answers=answers,
    )
    setSite(site)
    return site
