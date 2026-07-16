FROM ghcr.io/astral-sh/uv:0.7.22 AS uv

FROM python:3.12-slim AS development

WORKDIR /workspace/apps/ai
COPY --from=uv /uv /uvx /bin/
COPY apps/ai/pyproject.toml apps/ai/uv.lock ./
RUN uv sync --frozen --no-dev

COPY apps/ai/app ./app
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
