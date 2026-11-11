import importlib.metadata


def package_version(package_name: str) -> str:
    """Return the version of an installed package."""
    if not package_name:
        return "-"
    try:
        return importlib.metadata.version(package_name)
    except importlib.metadata.PackageNotFoundError:
        # Probably a sub package (i.e. portalbrasil.intranet.testing)
        package_name = (
            ".".join(package_name.split(".")[:-1]) if "." in package_name else ""
        )
        return package_version(package_name)
