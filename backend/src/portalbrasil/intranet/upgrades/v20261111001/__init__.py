"""Upgrade to 20261111001: Plone 6.2.3, sc.voltolighttheme 1.0.0a15 and Volto 19.7.0."""

from portalbrasil.intranet import logger
from Products.GenericSetup.tool import SetupTool


#: Plone core profiles whose version changes between Plone 6.2.2 and 6.2.3,
#: found by comparing the metadata.xml and upgrade ZCML of each package at both
#: versions. Each one is upgraded with ``portal_setup``, which runs only the
#: steps that are pending for the site:
#:
#: - ``Products.CMFPlone:plone`` 6205 -> 6206: a null step (``plone.app.upgrade``).
#: - ``plone.app.querystring:default`` 15 -> 16: adds the ``currentUID`` operation
#:   and makes the path field sortable (``upgrade_to_16`` import).
#: - ``plone.volto:default`` 1101 -> 1102: adds the ``personal_tools`` actions
#:   of the Volto toolbar (``actions`` import).
CORE_PROFILES = (
    "Products.CMFPlone:plone",
    "plone.app.querystring:default",
    "plone.volto:default",
)

#: Add-on profiles upgraded by this step.
#: ``kitconcept.voltolighttheme:default`` is not listed on purpose: it is no
#: longer a direct dependency, and ``sc.voltolighttheme`` brings it in. The
#: ``sc.voltolighttheme`` 1001 step uninstalls it on sites that still have it.
#: Between 1.0.0a12 and 1.0.0a15 neither profile changed its version or its
#: upgrade steps, so this step has nothing pending to run today.
DEPENDENCIES = ("sc.voltolighttheme:default",)


def _upgrade_profiles(setup_tool: SetupTool, profile_ids: tuple[str, ...]) -> None:
    """Run the pending upgrade steps of each profile and log the versions.

    :param setup_tool: The ``portal_setup`` tool.
    :param profile_ids: The profile ids to upgrade, in order.
    """
    for profile_id in profile_ids:
        before = setup_tool.getLastVersionForProfile(profile_id)
        setup_tool.upgradeProfile(profile_id)
        after = setup_tool.getLastVersionForProfile(profile_id)
        logger.info("Upgraded %s from %s to %s", profile_id, before, after)


def upgrade_core(setup_tool: SetupTool) -> None:
    """Apply the Plone 6.2.3 upgrade steps of the core profiles that changed.

    Runs the upgrade steps of ``CORE_PROFILES`` through ``portal_setup``. It
    does not run ``portal_migration``, which would also run Plone's other
    steps and set the instance version of the whole site.

    :param setup_tool: The ``portal_setup`` tool.
    """
    _upgrade_profiles(setup_tool, CORE_PROFILES)


def upgrade_dependencies(setup_tool: SetupTool) -> None:
    """Run the pending upgrade steps of the add-ons updated in this release.

    :param setup_tool: The ``portal_setup`` tool.
    """
    _upgrade_profiles(setup_tool, DEPENDENCIES)
