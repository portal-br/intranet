from plone.distribution.core import Distribution
from portalbrasil.intranet import __version__
from portalbrasil.intranet.utils import distributions as dist_utils

import pytest


class TestUtilsDistributions:
    @pytest.fixture(autouse=True)
    def _setup(self, portal) -> None:
        """Bind the Plone site to the test instance."""
        self.portal = portal

    def test_current_distribution(self):
        result = dist_utils.current_distribution()
        assert isinstance(result, Distribution)
        assert result.name == "portalbrasil-intranet"

    @pytest.mark.parametrize(
        "key,expected",
        [
            ("name", "portalbrasil-intranet"),
            ("title", "PortalBrasil: Intranet"),
            ("package_name", "portalbrasil.intranet.distributions"),
            ("package_version", __version__),
        ],
    )
    def test_distribution_info(self, key, expected):
        result = dist_utils.distribution_info()
        assert isinstance(result, dict)
        assert result[key] == expected
