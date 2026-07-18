# StadiumSphere AI – Phase 12.7 Master Prompt
## Application Services & Dependency Injection

Read README.md, docs/getting-started.md, and the existing architecture before making any changes.

Previously completed:

- Phase 11
- Phase 12.1 Persistence Infrastructure
- Phase 12.2 Generic Repository
- Phase 12.3 Domain Layer
- Phase 12.4 Application Layer Foundation
- Phase 12.5 Infrastructure Repository
- Phase 12.6 Presentation Layer

Do NOT modify previous phases unless required to resolve compilation or dependency injection.

---

# Objective

Implement the concrete Application Service layer and dependency injection wiring.

This phase connects:

Presentation

↓

Application Services

↓

Repository Interfaces

↓

Infrastructure Repositories

without violating Clean Architecture.

At the end of this phase:

- PresentationModule can safely be imported into AppModule.
- REST endpoints become executable.
- Controllers receive working application services.
- Repository implementations are resolved through DI.

Do NOT implement Authentication, Authorization, Booking workflows, or AI.

---

# Scope

Implement only:

apps/api/src/application/

services/

module

providers

dependency registration

Update:

ApplicationModule

AppModule

PresentationModule (only if necessary)

---

# Application Services

Create concrete services for:

- UserApplicationService
- StadiumApplicationService
- VenueApplicationService
- TeamApplicationService
- OrganizationApplicationService
- BookingApplicationService (placeholder)

Each service must:

- implement the existing RestApplicationService contract
- depend only on Application repository interfaces
- never access Mongo directly
- never use Mongoose
- never import infrastructure
- never contain controller logic

Reuse existing:

EntityApplicationService

where appropriate.

Avoid duplicated CRUD logic.

---

# Dependency Injection

Update ApplicationModule.

Register:

Application Services

Repository interface tokens

Mapper dependencies

Any required providers

Do not register controllers.

Infrastructure bindings must remain inside RepositoryModule.

ApplicationModule should import RepositoryModule only.

---

# AppModule

Once dependency injection is complete:

Import:

PresentationModule

Verify:

Application starts successfully.

Controllers are registered.

Health endpoint continues to work.

No circular dependencies.

---

# REST Verification

After wiring is complete, verify that routes are discoverable.

Examples:

GET /users

GET /stadiums

GET /venues

GET /teams

GET /organizations

Booking endpoints may remain placeholders.

Do not implement business workflows.

---

# Error Handling

Reuse:

Global Exception Filter

Application Exceptions

Persistence Exceptions

No new exception mechanism.

---

# Tests

Create:

Application service tests

Dependency injection tests

Controller resolution tests

Mock repositories only.

No MongoDB.

No Redis.

No external services.

---

# Documentation

Update:

README.md

docs/getting-started.md

Document:

Application Services

Dependency Injection

Repository bindings

Request flow

---

# Constraints

Do NOT implement:

Authentication

JWT

Authorization

Bookings

Payments

Notifications

Kafka

AI

Scheduling

Caching

Rate limiting changes

Swagger changes

Database schema changes

Repository refactoring

---

# Validation

Before completion execute:

pnpm build

pnpm lint

pnpm test

Verify:

Application boots successfully

PresentationModule is registered

Health endpoint still returns HTTP 200

Controllers resolve correctly

Swagger (if already configured) discovers the endpoints

---

# Completion Report

Provide:

1. Files created
2. Files modified
3. Dependency Injection summary
4. Architecture decisions
5. Validation summary
6. Any assumptions made

Stop after Phase 12.7.

Do NOT begin Authentication.