from portalbrasil.intranet import __version__
from portalbrasil.intranet.utils import packages as pkg_utils

import pytest


class TestUtilsPackages:
    @pytest.mark.parametrize(
        "package_name,expected",
        [
            ("portalbrasil.intranet", __version__),
            ("portalbrasil.intranet.testing", __version__),
            ("", "-"),
        ],
    )
    def test_package_version(self, package_name: str, expected: str):
        result = pkg_utils.package_version(package_name)
        assert result == expected
