# StadiumSphere AI – Phase 12.2 Master Prompt
## Repository & Persistence Layer

You are continuing development of the StadiumSphere AI enterprise platform.

IMPORTANT:

Read ALL project documentation before making any changes.

Read in this order:

1. README.md
2. docs/
3. prompts/README.md
4. Previous implementation
5. Existing source code

Treat the existing architecture as the source of truth.

Do NOT redesign the architecture.

Do NOT remove or replace existing modules.

Do NOT modify completed infrastructure unless absolutely required.

------------------------------------------------------------

Current Status

Completed:

✔ Enterprise Monorepo
✔ React Frontend
✔ NestJS Backend
✔ FastAPI AI Service
✔ Shared Packages
✔ Docker
✔ MongoDB Infrastructure
✔ Redis Infrastructure
✔ Health Monitoring
✔ Dependency Injection
✔ Environment Validation
✔ Logging
✔ Docker Compose
✔ Graceful Shutdown
✔ Runtime Validation
✔ Phase 12.1 Persistence Infrastructure

All existing build, lint and tests must continue passing.

------------------------------------------------------------

Objective

Implement ONLY Phase 12.2.

This phase builds the reusable persistence layer that every future business module will use.

DO NOT implement business logic.

NO Users.

NO Stadiums.

NO Bookings.

NO Tickets.

NO Authentication.

NO JWT.

NO RBAC.

NO REST endpoints.

NO GraphQL.

Infrastructure only.

------------------------------------------------------------

Architecture

Implement a reusable repository architecture following enterprise DDD principles.

Target folder:

apps/api/src/infrastructure/persistence/

Suggested structure:

persistence/
│
├── base/
│     BaseRepository.ts
│
├── interfaces/
│     IRepository.ts
│     IRepositoryOptions.ts
│
├── pagination/
│     Pagination.ts
│     PaginationResult.ts
│     PaginationOptions.ts
│
├── sorting/
│     SortOptions.ts
│
├── filtering/
│     FilterOptions.ts
│
├── exceptions/
│     EntityNotFoundException.ts
│     DuplicateEntityException.ts
│     PersistenceException.ts
│
├── helpers/
│     QueryBuilder.ts
│     PaginationHelper.ts
│
├── mappers/
│
└── index.ts

Use your judgment if minor structural improvements are needed while preserving the architecture.

------------------------------------------------------------

Repository Design

Create a generic repository abstraction.

Support methods similar to:

create()

update()

delete()

findById()

findOne()

findMany()

exists()

count()

The implementation should be reusable for every future MongoDB collection.

Avoid duplicate logic.

Keep the repository generic.

------------------------------------------------------------

Pagination

Create reusable pagination utilities.

Support:

page

limit

offset

total

totalPages

hasNext

hasPrevious

Return a strongly typed pagination result.

------------------------------------------------------------

Sorting

Implement reusable sorting.

Support:

ASC

DESC

Multiple fields

Strong typing.

------------------------------------------------------------

Filtering

Implement reusable filtering.

Support generic filters.

Design for future MongoDB queries.

Avoid business-specific assumptions.

------------------------------------------------------------

Repository Options

Create reusable query options.

Include support for:

pagination

sorting

projection

population

filters

Keep it generic.

------------------------------------------------------------

MongoDB Integration

Integrate with the MongoDB infrastructure created during Phase 12.1.

Reuse existing connection management.

Do NOT duplicate Mongo configuration.

------------------------------------------------------------

Error Handling

Create persistence-specific exceptions.

Examples:

EntityNotFoundException

DuplicateEntityException

PersistenceException

Exceptions should integrate cleanly with the existing global exception architecture.

Do NOT remove existing exception filters.

------------------------------------------------------------

Dependency Injection

Repositories should integrate with the existing NestJS dependency injection system.

Follow the same patterns already used in the project.

------------------------------------------------------------

Testing

Create focused unit tests for:

Repository

Pagination

Sorting

Filtering

Helpers

Exceptions

Repository options

Tests should be deterministic.

Mock external dependencies.

Do not require a live MongoDB instance.

------------------------------------------------------------

Documentation

Update:

README.md

docs/getting-started.md

Document:

Repository architecture

Pagination

Sorting

Filtering

Repository usage

Developer guidance

------------------------------------------------------------

Validation

Before finishing verify:

pnpm install

pnpm build

pnpm lint

pnpm test

Docker Compose still works.

No existing tests are broken.

------------------------------------------------------------

Constraints

Do NOT:

Change application architecture.

Remove modules.

Refactor unrelated code.

Modify React.

Modify AI service.

Implement domain models.

Implement controllers.

Implement APIs.

Implement authentication.

Implement authorization.

Implement business features.

Keep changes limited strictly to Phase 12.2.

------------------------------------------------------------

Expected Deliverables

Provide:

1. Files Created

2. Files Modified

3. Repository Architecture Summary

4. Pagination Design

5. Filtering Design

6. Sorting Design

7. Validation Results

8. Any assumptions made

Stop after Phase 12.2 is complete.

Do not begin Phase 12.3.