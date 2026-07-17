# StadiumSphere AI – Phase 12.6 Master Prompt
## Presentation Layer (REST API)

Read README.md, docs/getting-started.md, and the existing project architecture before making any changes.

This project follows strict Clean Architecture and Domain-Driven Design.

Previously completed:

- Phase 11
- Phase 12.1 Persistence
- Phase 12.2 Generic Repository
- Phase 12.3 Domain
- Phase 12.4 Application
- Phase 12.5 Infrastructure Repository

Do NOT modify previous phases unless absolutely required to fix compilation.

---

# Objective

Implement the Presentation Layer.

This phase exposes the Application Layer through REST controllers.

No business logic belongs here.

Controllers should only:

Request
↓

DTO Validation

↓

Application Service

↓

Response

---

# Architecture

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Do NOT violate this dependency direction.

---

# Create

apps/api/src/presentation/

including:

controllers/

dto/

responses/

interceptors/

presentation.module.ts

index.ts

---

# Controllers

Implement controllers for:

User

Stadium

Venue

Team

Organization

Booking (placeholder only)

Each controller should expose:

GET /

GET /:id

POST /

PUT /:id

DELETE /:id

Controllers must NOT:

contain business logic

access MongoDB

use Mongoose

instantiate repositories

call infrastructure directly

perform mapping

Controllers call Application Services only.

---

# DTOs

Create transport DTOs only.

Examples:

CreateUserDto

UpdateUserDto

CreateStadiumDto

UpdateStadiumDto

...

Use:

class-validator

class-transformer

ValidationPipe compatibility.

No domain validation here.

---

# Responses

Create reusable response models.

Example:

SuccessResponse<T>

PagedResponse<T>

ErrorResponse

Standard success format:

{
  "success": true,
  "message": "...",
  "data": {}
}

Reuse existing global exception filter.

Do NOT create another error mechanism.

---

# Swagger

Configure controllers with:

@ApiTags

@ApiOperation

@ApiResponse

@ApiBearerAuth (where appropriate)

Swagger should automatically document all endpoints.

Do not modify application bootstrap unless Swagger is not already configured.

---

# Dependency Injection

Create PresentationModule.

PresentationModule imports ApplicationModule.

No circular imports.

---

# Validation

Use Nest ValidationPipe.

Use decorators such as:

@IsString()

@IsEmail()

@IsUUID()

@IsOptional()

etc.

---

# Tests

Create:

Controller tests

DTO validation tests

Mock Application Service tests

No MongoDB.

No Redis.

No HTTP integration tests.

Mock dependencies only.

---

# Documentation

Update:

README.md

docs/getting-started.md

Document:

Presentation Layer

REST API

DTOs

Controller responsibilities

Swagger usage

---

# Constraints

DO NOT implement:

Authentication

Authorization

JWT

Booking workflows

Payments

Notifications

Kafka

AI

WebSockets

Scheduling

Repository logic

Business rules

Persistence logic

---

# Validation

Before finishing execute:

pnpm build

pnpm lint

pnpm test

Report:

Files created

Files modified

Architecture decisions

Validation results

Any assumptions

Stop after Phase 12.6 only.

Do NOT begin Phase 12.7.