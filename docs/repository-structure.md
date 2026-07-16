# Repository Structure

| Path               | Responsibility                                                                       |
| ------------------ | ------------------------------------------------------------------------------------ |
| `apps/web`         | React user-interface application foundation.                                         |
| `apps/api`         | NestJS API foundation with Clean Architecture boundaries.                            |
| `apps/ai`          | FastAPI AI-service foundation.                                                       |
| `packages/*`       | Reusable configuration, types, utilities, UI, and SDK boundaries.                    |
| `infrastructure/*` | Docker, Kubernetes, Terraform, monitoring, and infrastructure automation boundaries. |
| `scripts`          | Repository-level bootstrap and validation automation.                                |
| `.github`          | CI, templates, code ownership, and dependency-update configuration.                  |
| `docs`             | Architecture authority and developer documentation.                                  |
| `prompts`          | Phase implementation specifications retained as project source material.             |

Business features are intentionally absent from this Phase 11 repository foundation.
