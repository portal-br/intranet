import pytest


@pytest.fixture(scope="session")
def answers() -> dict:
    """Return site-creation answers configuring the OIDC provider."""
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
            "provider": "oidc",
            "oidc-issuer": "http://localhost:8180/realms/site",
            "oidc-client_id": "plone",
            "oidc-client_secret": "12345678",
            "oidc-site-url": "http://localhost:3000",
            "oidc-scope": ["openid", "profile", "email"],
        },
    }
