from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Validated configuration sourced exclusively from the runtime environment."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    environment: Literal["development", "qa", "staging", "production", "test"]
    port: int = Field(ge=1, le=65535)
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR"]


@lru_cache
def get_settings() -> Settings:
    return Settings()
