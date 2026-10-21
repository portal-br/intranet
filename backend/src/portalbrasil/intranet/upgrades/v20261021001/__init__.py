"""Upgrade to 20261021001: Plone 6.2.2 and sc.voltolighttheme 1.0.0a12."""

from plone.base.interfaces import IImagingSchema
from plone.registry.interfaces import IRegistry
from portalbrasil.intranet import logger
from Products.GenericSetup.tool import SetupTool
from sc.voltolighttheme.interfaces import ISCVLTThemeDefinition
from sc.voltolighttheme.utils import themes
from zope.component import getUtility


#: Add-on profiles upgraded by this step, in dependency order:
#: ``sc.voltolighttheme`` depends on ``plonegovbr.socialmedia``.
#: ``kitconcept.voltolighttheme:default`` is not listed on purpose: the
#: ``sc.voltolighttheme`` 1001 step uninstalls it, and its own upgrade steps
#: would migrate behaviors this site no longer uses.
DEPENDENCIES = (
    "plonegovbr.socialmedia:default",
    "sc.voltolighttheme:default",
)

#: Content-type colors added to ``ISCVLTThemeDefinition`` in
#: sc.voltolighttheme 1.0.0a6. Kept in sync with the ``default`` theme in
#: ``profiles/default/registry/sc.voltolighttheme.themes.xml``.
CONTENT_TYPE_COLORS = {
    "event_color_light": "#d32f2f",
    "event_color_dark": "#d32f2f",
    "file_color_light": "#1976d2",
    "file_color_dark": "#1976d2",
    "image_color_light": "#388e3c",
    "image_color_dark": "#388e3c",
}

#: ``sizes`` attribute Plone 6.2.2 adds to the default ``small`` picture variant.
SMALL_VARIANT_SIZES = "(min-width: 576px) 400px, (min-width: 768px) 600px, 98vw"


def upgrade_dependencies(setup_tool: SetupTool) -> None:
    """Run the pending upgrade steps of the add-ons updated in this release.

    ``plonegovbr.socialmedia`` goes from 1000 to 1001 (the ``social_links``
    catalog column). ``sc.voltolighttheme`` has no pending step today, but is
    upgraded too, so a site installed from an older release catches up.

    :param setup_tool: The ``portal_setup`` tool.
    """
    for profile_id in DEPENDENCIES:
        before = setup_tool.getLastVersionForProfile(profile_id)
        setup_tool.upgradeProfile(profile_id)
        after = setup_tool.getLastVersionForProfile(profile_id)
        logger.info("Upgraded %s from %s to %s", profile_id, before, after)


def update_imaging_schema(setup_tool: SetupTool) -> None:
    """Apply the Plone 6.2.2 change to the ``IImagingSchema`` records.

    Mirrors ``plone.app.upgrade.v62.final.update_iimagingschema_fields``,
    registered for ``Products.CMFPlone:plone``. Sites created by this
    distribution have ``portalbrasil.intranet:base`` as their baseline
    profile, so that step never runs on them.

    :param setup_tool: The ``portal_setup`` tool.
    """
    registry = getUtility(IRegistry)
    registry.registerInterface(IImagingSchema, prefix="plone")
    logger.info("Re-registered the IImagingSchema records")

    picture_variants = registry.records["plone.picture_variants"].value
    sourceset = picture_variants.get("small", {}).get("sourceset", [])
    if (
        len(sourceset) == 1
        and sourceset[0].get("scale") == "preview"
        and set(sourceset[0].get("additionalScales", [])) == {"large", "larger"}
        and "sizes" not in sourceset[0]
    ):
        sourceset[0]["sizes"] = SMALL_VARIANT_SIZES
        picture_variants["small"]["sourceset"] = sourceset
        registry["plone.picture_variants"] = picture_variants
        logger.info("Added the sizes attribute to the small picture variant")
    else:
        logger.info("Kept the customized small picture variant unchanged")


def update_theme_definitions(setup_tool: SetupTool) -> None:
    """Add the content-type colors to every theme in the registry.

    Re-registering ``ISCVLTThemeDefinition`` under each theme prefix creates
    the records added in sc.voltolighttheme 1.0.0a6 and keeps every value
    already stored. The ``default`` theme then gets the intranet colors for
    the fields still unset; themes created by managers are left for them to
    fill in from the Themes control panel.

    :param setup_tool: The ``portal_setup`` tool.
    """
    registry = getUtility(IRegistry)
    for theme_id in themes.theme_ids(registry):
        prefix = themes.record_name(theme_id, "").rstrip(".")
        registry.registerInterface(ISCVLTThemeDefinition, prefix=prefix)
        logger.info("Re-registered the records of theme %s", theme_id)

    default_id = themes.DEFAULT_THEME_ID
    current = themes.theme_values(default_id, registry)
    missing = {
        name: value
        for name, value in CONTENT_TYPE_COLORS.items()
        if current.get(name) is None
    }
    if missing:
        themes.update_theme(default_id, missing, registry)
        logger.info("Set %s on theme %s", ", ".join(sorted(missing)), default_id)
