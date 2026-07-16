# AI service

This FastAPI application is the technical foundation for future modular AI capabilities. It supplies
typed configuration validation, structured logging, a technical health endpoint, and directories for
independently testable agent architecture components. It deliberately implements no agents, workflows,
prompts, tools, retrieval, or business APIs in Phase 11.

## Local development

1. Install Python 3.12 or later and uv.
2. Copy `.env.example` to `.env`.
3. Run `uv sync --directory apps/ai`.
4. Start the service with `uv run --directory apps/ai uvicorn app.main:app --reload`.

The technical health endpoint is available at `GET /health`.
