from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI

from app.api.router import api_router
from app.config.settings import get_settings
from app.utils.logging import configure_logging

logger = structlog.get_logger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    settings = get_settings()
    configure_logging(settings.log_level)
    logger.info(
        "ai_service_started",
        environment=settings.environment,
        port=settings.port,
    )
    yield
    logger.info("ai_service_stopped")


app = FastAPI(
    title="StadiumSphere AI Service Foundation",
    description="Technical AI service foundation with no business capabilities.",
    version="0.1.0",
    lifespan=lifespan,
)
app.include_router(api_router)
