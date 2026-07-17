# StadiumSphere AI – Phase 12.3 Master Prompt
# Domain Layer (Enterprise DDD Foundation)

You are continuing development of StadiumSphere AI.

------------------------------------------------------------
READ FIRST
------------------------------------------------------------

Before making any changes read:

1. README.md
2. docs/
3. prompts/README.md
4. prompts/Phase12_1_MasterPrompt.md
5. prompts/Phase12_2_MasterPrompt.md
6. Existing source code

Treat the current implementation as the source of truth.

Do NOT redesign existing architecture.

Do NOT modify completed phases unless required to support this phase.

------------------------------------------------------------
Current Status
------------------------------------------------------------

Completed:

✔ Enterprise Monorepo
✔ NestJS Backend
✔ React Frontend
✔ FastAPI AI Service
✔ MongoDB Infrastructure
✔ Redis Infrastructure
✔ Health Monitoring
✔ Repository Layer
✔ Persistence Layer
✔ Generic Pagination
✔ Generic Filtering
✔ Generic Sorting
✔ Repository Exceptions

All existing tests/build/lint currently pass.

Maintain this state.

------------------------------------------------------------
Objective
------------------------------------------------------------

Implement ONLY Phase 12.3.

Build the Domain Layer following Domain-Driven Design principles.

This phase defines business objects only.

NO infrastructure.

NO controllers.

NO DTOs.

NO MongoDB schemas.

NO repositories.

NO REST APIs.

NO GraphQL.

NO authentication.

NO authorization.

------------------------------------------------------------
Target Structure
------------------------------------------------------------

apps/api/src/domain/

Suggested structure:

domain/

├── common/
│
├── entity/
│     Entity.ts
│
├── aggregate-root/
│     AggregateRoot.ts
│
├── value-object/
│     ValueObject.ts
│
├── identifier/
│     Identifier.ts
│     UniqueEntityId.ts
│
├── domain-event/
│     DomainEvent.ts
│
├── exceptions/
│
├── interfaces/
│
├── user/
│
├── stadium/
│
├── booking/
│
├── event/
│
├── organization/
│
├── sport/
│
└── shared/

Use your judgment if small structural improvements are beneficial.

------------------------------------------------------------
Entity Base Class
------------------------------------------------------------

Create a reusable Entity base class.

Responsibilities:

Identity

Equality

Serialization support

Business identity comparison

Entities should compare by identity rather than object reference.

------------------------------------------------------------
Aggregate Root
------------------------------------------------------------

Create a reusable AggregateRoot.

Support:

Domain events collection

Add event

Clear events

Retrieve events

Do not publish events yet.

Only prepare the architecture.

------------------------------------------------------------
Unique Identifier
------------------------------------------------------------

Create reusable identifiers.

Support:

UniqueEntityId

Strong typing

Equality comparison

String conversion

Designed for future UUID usage.

------------------------------------------------------------
Value Object Base
------------------------------------------------------------

Create reusable ValueObject abstraction.

Responsibilities:

Immutability

Equality comparison

Serialization

Validation hook

------------------------------------------------------------
Core Value Objects
------------------------------------------------------------

Implement reusable value objects.

Examples:

Email

Money

PhoneNumber

Address

GeoLocation

Coordinates

TimeSlot

Capacity

OperatingHours

Each value object should validate itself.

Throw domain exceptions on invalid values.

Keep implementations generic.

------------------------------------------------------------
Domain Exceptions
------------------------------------------------------------

Create domain-specific exceptions.

Examples:

InvalidEmailException

InvalidMoneyException

InvalidCapacityException

InvalidCoordinatesException

InvalidTimeSlotException

These should integrate cleanly with existing exception handling.

------------------------------------------------------------
Domain Events
------------------------------------------------------------

Create reusable domain event contracts.

Examples:

BookingCreated

BookingCancelled

UserRegistered

StadiumApproved

EventPublished

Do NOT integrate Kafka, Pub/Sub or Redis.

Only define contracts.

------------------------------------------------------------
Placeholder Domain Entities
------------------------------------------------------------

Create lightweight domain entities only.

Examples:

User

Stadium

Booking

Event

Organization

Sport

Team

Venue

Do NOT include persistence annotations.

Do NOT include Mongo decorators.

Do NOT create DTOs.

Focus on business identity and structure.

------------------------------------------------------------
Interfaces
------------------------------------------------------------

Create reusable domain interfaces where appropriate.

Examples:

Auditable

Timestamped

SoftDeletable

DomainEventAware

Keep interfaces generic.

------------------------------------------------------------
Testing
------------------------------------------------------------

Create unit tests for:

Entity equality

Aggregate root

UniqueEntityId

Value objects

Domain exceptions

Domain events

Ensure deterministic tests.

No infrastructure dependencies.

------------------------------------------------------------
Documentation
------------------------------------------------------------

Update:

README.md

docs/getting-started.md

Document:

Domain architecture

Entity design

Aggregate roots

Value objects

Domain events

Identifier strategy

------------------------------------------------------------
Validation
------------------------------------------------------------

Before finishing verify:

pnpm install

pnpm build

pnpm lint

pnpm test

All existing tests continue passing.

No regressions.

------------------------------------------------------------
Constraints
------------------------------------------------------------

Do NOT:

Implement repositories.

Implement services.

Implement controllers.

Implement APIs.

Implement authentication.

Implement Mongo schemas.

Implement Mongoose models.

Implement database access.

Implement CQRS.

Implement business workflows.

Remain strictly within the Domain Layer.

------------------------------------------------------------
Deliverables
------------------------------------------------------------

Provide:

1. Files Created

2. Files Modified

3. Domain Architecture Summary

4. Entity Design Summary

5. Aggregate Root Design

6. Value Object Summary

7. Domain Events Summary

8. Validation Results

9. Assumptions

Stop after Phase 12.3.

Do NOT begin Phase 12.4.