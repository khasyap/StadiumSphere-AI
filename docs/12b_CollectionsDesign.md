# Phase 12B – Collections Design

**Project:** StadiumSphere AI  
**Phase:** 12B – Collections Design  
**Document Version:** 1.0

---

# Objective

This document defines the complete MongoDB collection architecture for StadiumSphere AI.

The objective is to establish a scalable, modular, and maintainable data model that supports all current and future business capabilities.

Collections are organized by business domains rather than application screens.

This document acts as the source of truth for all database entities.

---

# Design Principles

The collection design follows these principles:

- One business entity = One collection
- Loose coupling between collections
- References instead of deep nesting
- Optimized for reads
- Optimized for scalability
- Future AI compatibility
- Auditability
- Security
- Cloud readiness

---

# Database Overview

```
stadiumsphere-ai
│
├── users
├── roles
├── permissions
├── stadiums
├── events
├── matches
├── teams
├── seats
├── bookings
├── tickets
├── payments
├── notifications
├── reviews
├── favorites
├── chat_history
├── ai_memory
├── recommendations
├── audit_logs
├── system_settings
└── refresh_tokens
```

---

# Domain 1 — Identity Management

## users

Stores every registered user.

Examples:

- Customers
- Admins
- Stadium Managers
- Support Staff

Typical fields

- _id
- firstName
- lastName
- email
- phone
- passwordHash
- roleId
- profileImage
- status
- createdAt
- updatedAt

---

## roles

Examples

- Super Admin
- Admin
- Stadium Manager
- Event Manager
- Customer
- Support

---

## permissions

Examples

- CREATE_EVENT
- UPDATE_EVENT
- DELETE_EVENT
- BOOK_TICKET
- VIEW_REPORTS

---

## refresh_tokens

Stores active login sessions.

Purpose

- Secure authentication
- Token rotation
- Logout support

---

# Domain 2 — Stadium Management

## stadiums

Stores stadium information.

Examples

- Wankhede
- Eden Gardens
- Chinnaswamy
- Narendra Modi Stadium

Typical fields

- name
- city
- country
- capacity
- facilities
- parking
- location
- images

---

## seats

Each seat belongs to one stadium.

Examples

- Block
- Row
- Seat Number
- Category
- VIP
- Premium
- Economy

---

# Domain 3 — Event Management

## events

Represents an event.

Examples

- IPL
- FIFA
- Concert
- Music Festival

Fields

- title
- description
- category
- organizer
- venue
- status

---

## matches

Represents an actual match.

Examples

India vs Australia

RCB vs CSK

Barcelona vs Madrid

Fields

- eventId
- stadiumId
- teamA
- teamB
- startTime
- endTime
- ticketStatus

---

## teams

Stores participating teams.

Examples

- India
- Australia
- CSK
- RCB

Fields

- name
- logo
- country
- sport

---

# Domain 4 — Booking System

## bookings

Central booking record.

Fields

- userId
- matchId
- ticketIds
- bookingDate
- bookingStatus
- paymentStatus
- totalAmount

---

## tickets

Individual ticket.

Each ticket belongs to one booking.

Fields

- bookingId
- seatId
- QR Code
- ticketType
- price
- validationStatus

---

## payments

Stores payment history.

Fields

- bookingId
- paymentGateway
- transactionId
- amount
- paymentStatus
- paymentDate

---

# Domain 5 — User Experience

## favorites

Stores user's favorite

- Teams
- Stadiums
- Events

Used for recommendations.

---

## reviews

Stores reviews for

- Stadiums
- Events
- Matches

Future AI sentiment analysis will use this.

---

## notifications

Stores notifications.

Examples

Booking confirmed

Match cancelled

Payment successful

Reminder

AI recommendations

---

# Domain 6 — Artificial Intelligence

## chat_history

Stores user conversations.

Examples

"What matches are available tomorrow?"

"Suggest family-friendly seats."

---

## ai_memory

Stores long-term AI memory.

Examples

Preferred stadium

Favorite teams

Budget

Language

Accessibility preferences

---

## recommendations

Stores generated recommendations.

Examples

Suggested matches

Suggested seats

Suggested food

Suggested parking

Future personalization engine uses this.

---

# Domain 7 — Platform

## audit_logs

Stores every critical operation.

Examples

User login

Booking cancelled

Payment refunded

Admin updated event

AI action executed

---

## system_settings

Stores configurable platform settings.

Examples

Booking timeout

Cancellation policy

Tax percentage

Platform announcements

Feature flags

---

# Collection Relationships

```
Users
 │
 ├──────────────┐
 │              │
 ▼              ▼
Bookings     Chat History
 │
 ▼
Tickets
 │
 ▼
Seats
 │
 ▼
Stadium

Events
 │
 ▼
Matches
 │
 ▼
Bookings

Payments
 │
 ▼
Bookings

Recommendations
 │
 ▼
Users
```

---

# AI Data Separation

Business Data

- users
- bookings
- payments
- tickets

AI Data

- chat_history
- ai_memory
- recommendations

This separation allows AI services to evolve independently.

---

# Naming Convention

Collections use

snake_case

Examples

chat_history

audit_logs

refresh_tokens

MongoDB field names use

camelCase

Examples

firstName

createdAt

ticketPrice

bookingStatus

---

# Soft Delete Strategy

Critical collections support soft delete.

Instead of deleting

```
delete
```

we use

```
status

ACTIVE

INACTIVE

DELETED
```

This protects business data.

---

# Future Collections

Possible additions

- coupons
- loyalty_points
- sponsorships
- advertisements
- live_scores
- parking
- food_orders
- merchandise
- support_tickets

The architecture allows these without redesign.

---

# Phase 12 Outcome

At the end of implementation every collection will have

- Schema
- Validation
- Repository
- Indexes
- Unit Tests
- API Integration

---

# Conclusion

The StadiumSphere AI data model is designed around business domains rather than application pages.

This ensures the platform remains scalable, maintainable, and AI-ready as new features are introduced.

The collection architecture defined here becomes the single source of truth for all future persistence implementations.