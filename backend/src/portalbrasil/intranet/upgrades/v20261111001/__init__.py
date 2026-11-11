"""Upgrade to 20261111001: Plone 6.2.3, sc.voltolighttheme 1.0.0a15 and Volto 19.7.0."""

from portalbrasil.intranet import logger
from Products.GenericSetup.tool import SetupTool


#: Add-on profiles upgraded by this step.
#: ``kitconcept.voltolighttheme:default`` is not listed on purpose: it is no
#: longer a direct dependency, and ``sc.voltolighttheme`` brings it in. The
#: ``sc.voltolighttheme`` 1001 step uninstalls it on sites that still have it.
#: Between 1.0.0a12 and 1.0.0a15 neither profile changed its version or its
#: upgrade steps, so this step has nothing pending to run today.
DEPENDENCIES = ("sc.voltolighttheme:default",)


def upgrade_dependencies(setup_tool: SetupTool) -> None:
    """Run the pending upgrade steps of the add-ons updated in this release.

    The Plone 6.2.3 upgrade steps are not run here: they belong to Plone
    core and are applied through ``portal_migration``.

    :param setup_tool: The ``portal_setup`` tool.
    """
    for profile_id in DEPENDENCIES:
        before = setup_tool.getLastVersionForProfile(profile_id)
        setup_tool.upgradeProfile(profile_id)
        after = setup_tool.getLastVersionForProfile(profile_id)
        logger.info("Upgraded %s from %s to %s", profile_id, before, after)
