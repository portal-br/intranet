"""Init and utils."""

from portalbrasil.intranet.patches.schema import apply_patch
from zope.i18nmessageid import MessageFactory

import logging


__version__ = "2.0.0a1"

PACKAGE_NAME = "portalbrasil.intranet"
DEFAULT_PROFILE = f"{PACKAGE_NAME}:base"
CMF_DEPENDENCIES_PROFILE = f"{PACKAGE_NAME}:cmfdependencies"
INTRANET_PROFILE = f"{PACKAGE_NAME}:default"
DEMO_PROFILE = f"{PACKAGE_NAME}:demo"

_ = MessageFactory(PACKAGE_NAME)

logger = logging.getLogger(PACKAGE_NAME)


def initialize(context):
    from portalbrasil.intranet.tools import migration
    from Products.CMFPlone.utils import ToolInit

    tools = (migration.MigrationTool,)
    # Register tools and content
    ToolInit(
        "Plone Tool",
        tools=tools,
        icon="tool.gif",
    ).initialize(context)


apply_patch(logger=logger)
