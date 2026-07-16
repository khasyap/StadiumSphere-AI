import os

os.environ.update(
    {
        "ENVIRONMENT": "test",
        "LOG_LEVEL": "ERROR",
        "PORT": "8000",
    },
)

from fastapi.testclient import TestClient

from app.config.settings import get_settings
from app.main import app


def test_health_endpoint_returns_technical_status() -> None:
    get_settings.cache_clear()

    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
