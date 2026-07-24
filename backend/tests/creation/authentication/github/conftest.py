import pytest


@pytest.fixture(scope="session")
def answers() -> dict:
    """Return site-creation answers configuring the GitHub (Authomatic) provider."""
    return {
        "site_id": "intranet",
        "title": "Portal Brasil: Intranet",
        "description": "Intranet desenvolvida com Portal Brasil",
        "available_languages": ["pt-br"],
        "default_language": "pt-br",
        "portal_timezone": "America/Sao_Paulo",
        "setup_content": True,
        "demo_content": False,
        "authentication": {
            "provider": "authomatic-github",
            "authomatic-github-consumer_key": "gh-32510011",
            "authomatic-github-consumer_secret": "12345678",
            "authomatic-github-scope": ["read:user", "user:email"],
        },
    }
