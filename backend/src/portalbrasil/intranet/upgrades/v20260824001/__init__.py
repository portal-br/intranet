from Products.GenericSetup.tool import SetupTool
from sc.voltolighttheme import logger


def upgrade_sc_volto_light_theme(context: SetupTool) -> None:
    """Upgrade sc.voltolighttheme."""
    profile_id = "sc.voltolighttheme:default"
    context.upgradeProfile(profile_id)
    logger.info("Upgraded sc.voltolighttheme to the latest version.")
