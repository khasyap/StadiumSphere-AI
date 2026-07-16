from datetime import UTC, datetime

from fastapi import APIRouter

from app.models.health import HealthResponse

router = APIRouter(tags=["platform"])


@router.get("/health", response_model=HealthResponse, summary="Get AI service foundation health")
async def get_health() -> HealthResponse:
    return HealthResponse(status="healthy", timestamp=datetime.now(UTC))
