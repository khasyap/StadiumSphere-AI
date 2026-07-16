# Phase 12C – Repository Pattern

**Project:** StadiumSphere AI  
**Phase:** 12C – Repository Pattern  
**Document Version:** 1.0

---

# Objective

This document defines how StadiumSphere AI communicates with MongoDB.

Rather than allowing controllers or services to directly access the database, all persistence operations pass through a dedicated Repository Layer.

This approach promotes maintainability, scalability, testability, and separation of concerns.

This document serves as the architectural guideline for every database operation implemented in the project.

---

# Why Repository Pattern?

The Repository Pattern abstracts database operations behind a clean interface.

Instead of business logic knowing how MongoDB works, it simply asks the repository for data.

Without Repository Pattern

```

Controller
↓
MongoDB

```

Problems

- Tight coupling
- Difficult testing
- Duplicate queries
- Poor maintainability

---

With Repository Pattern

```

Controller
↓

Service
↓

Repository
↓

MongoDB

```

Benefits

- Loose coupling
- Better testing
- Reusable queries
- Cleaner business logic
- Easier database migration

---

# Architectural Layers

The backend follows a layered architecture.

```

Request

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Repository

↓

Service

↓

Controller

↓

Response

```

Each layer has exactly one responsibility.

---

# Layer Responsibilities

## Controller

Responsible for

- Receiving HTTP requests
- Input validation
- Calling Services
- Returning HTTP responses

Controllers NEVER communicate with MongoDB.

---

## Service

Responsible for

- Business rules
- Application logic
- Authorization
- Validation
- Transactions

Services NEVER write MongoDB queries.

Services call repositories.

---

## Repository

Responsible for

- Database queries
- CRUD operations
- Aggregation pipelines
- Pagination
- Search
- Index-aware queries

Repositories contain ZERO business logic.

---

## MongoDB

Responsible only for

- Data persistence

---

# Request Flow Example

User books a ticket.

```

React

↓

POST /book-ticket

↓

BookingController

↓

BookingService

↓

BookingRepository

↓

MongoDB

↓

BookingRepository

↓

BookingService

↓

BookingController

↓

React

```

Business rules remain inside the service.

Database operations remain inside repositories.

---

# Why Controllers Never Access MongoDB

Incorrect

```

BookingController

↓

MongoDB

```

Problems

- Controllers become huge
- Duplicate code
- Difficult testing
- Business logic leaks

Correct

```

BookingController

↓

BookingService

↓

BookingRepository

↓

MongoDB

```

---

# Why Services Never Write Queries

Incorrect

```typescript
if (...)

db.collection.find(...)

```

Now business logic and persistence are mixed.

Correct

```typescript
bookingRepository.findByUser(...)
```

The service does not care how MongoDB retrieves data.

---

# Repository Responsibilities

Each repository owns one collection.

Examples

```

UserRepository

BookingRepository

TicketRepository

MatchRepository

EventRepository

PaymentRepository

NotificationRepository

RecommendationRepository

```

Repositories never manipulate unrelated collections.

---

# Base Repository

Every repository shares common operations.

Examples

Create

Update

Delete

Find By ID

Find All

Exists

Pagination

Sorting

Filtering

Rather than rewriting these methods repeatedly, a shared BaseRepository will provide common functionality.

Specialized repositories extend this base.

---

# Example Repository Hierarchy

```

BaseRepository

│

├── UserRepository

├── BookingRepository

├── TicketRepository

├── MatchRepository

├── EventRepository

├── PaymentRepository

├── NotificationRepository

└── RecommendationRepository

```

---

# Query Responsibility

Simple CRUD

Repository

Complex Aggregations

Repository

Business Decisions

Service

Authentication

Service

Validation

Controller + Service

---

# Repository Naming Convention

Repository names use PascalCase.

Examples

```

UserRepository

BookingRepository

MatchRepository

```

Repository files use kebab-case.

Examples

```

user.repository.ts

booking.repository.ts

match.repository.ts

```

---

# Dependency Injection

Repositories are injected into services using NestJS Dependency Injection.

```

Controller

↓

Service

↓

Repository

```

Controllers never instantiate repositories.

Services never instantiate repositories.

Everything is managed by NestJS.

---

# Unit Testing Strategy

Repositories

Mock MongoDB

Services

Mock Repository

Controllers

Mock Service

This allows isolated testing for every layer.

---

# Error Handling

Repositories throw database-related exceptions.

Examples

Connection failed

Duplicate key

Document not found

Timeout

Services decide how to respond to those exceptions.

Controllers never interpret database errors.

---

# Future Scalability

If MongoDB is replaced by another database in the future

```

MongoDB

↓

PostgreSQL

```

Only repositories require modification.

Controllers and services remain unchanged.

This dramatically reduces migration effort.

---

# AI Integration

The AI Service never communicates directly with MongoDB collections.

Instead

```

AI

↓

API

↓

Repository

↓

MongoDB

```

This preserves security and business rules.

---

# Repository Design Principles

Every repository must follow these principles.

- Single Responsibility
- No Business Logic
- Reusable Queries
- Dependency Injection
- Testability
- Clean Interfaces
- Consistent Naming
- Type Safety

---

# Phase 12 Deliverables

Implementation will include

- Base Repository
- Generic CRUD Operations
- Repository Interfaces
- MongoDB Integration
- Dependency Injection
- Unit Tests
- Error Handling
- Pagination Support

---

# Conclusion

The Repository Pattern provides a clean separation between business logic and persistence.

Controllers remain lightweight.

Services focus on business rules.

Repositories focus on MongoDB.

This architecture improves maintainability, testing, scalability, and long-term development velocity.

The Repository Layer becomes the only component responsible for communicating with the database throughout the lifecycle of StadiumSphere AI.
