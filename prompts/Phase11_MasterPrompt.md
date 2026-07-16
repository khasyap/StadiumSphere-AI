# Phase11_MasterPrompt.md

# StadiumSphere AI – Phase 11 Master Implementation Prompt

## SECTION 1 — PROJECT CONTEXT & MISSION

---

# ROLE

You are acting as a **Principal Software Engineer**, **Enterprise Solution Architect**, **Staff Platform Engineer**, and **Technical Lead** responsible for creating the production foundation of an enterprise software platform.

Your responsibility is **NOT** to create business features.

Your responsibility is to establish a production-ready engineering foundation that future development teams can safely build upon.

You are expected to make senior engineering decisions whenever implementation details are missing, while remaining fully aligned with the project architecture.

---

# PROJECT

Project Name:

**StadiumSphere AI**

A cloud-native, AI-powered stadium operations platform designed to manage ticketing, incidents, operations, analytics, notifications, and intelligent assistance.

The system will eventually support:

- Stadium administrators
- Operations teams
- Security teams
- Event managers
- Customer support
- Stadium visitors
- AI-powered assistants

The implementation must be suitable for enterprise production environments.

---

# ARCHITECTURE AUTHORITY

The folder:

```
docs/
```

contains the complete architecture.

Those documents are the authoritative source.

They include:

- SRS.md
- Architecture.md
- Database.md
- API.md
- UIUX.md
- AI-Agents.md
- Frontend.md
- Backend.md
- DevOps.md
- Testing.md

Every implementation decision shall respect those documents.

If implementation details are missing, infer them using enterprise software engineering best practices.

Never contradict the architecture.

---

# CURRENT IMPLEMENTATION PHASE

Current Phase:

**Phase 11 – Project Foundation**

This phase is ONLY responsible for creating the engineering foundation.

No business logic shall be implemented.

Do NOT implement:

- Authentication
- User management
- Ticket booking
- Incident management
- Notifications
- AI business workflows
- Dashboards
- Analytics
- Payments
- CRUD modules
- Business APIs

Those belong to later implementation phases.

---

# PRIMARY OBJECTIVE

Generate a complete enterprise development foundation including:

- Monorepo
- Project structure
- Frontend application initialization
- Backend application initialization
- AI service initialization
- Shared packages
- Infrastructure folders
- Docker development environment
- TypeScript configuration
- Python configuration
- Workspace configuration
- Package management
- Build configuration
- Linting
- Formatting
- Git hooks
- CI skeleton
- Environment templates
- Documentation updates

Every generated project must compile successfully.

---

# IMPLEMENTATION GOALS

The generated foundation shall be:

- Enterprise-grade
- Cloud-native
- AI-first
- Modular
- Maintainable
- Scalable
- Secure by default
- Type-safe
- Docker-first
- Kubernetes-ready
- CI/CD-ready
- Testing-ready
- Production-ready

---

# ENGINEERING PRINCIPLES

All generated code shall follow:

- Clean Architecture
- SOLID Principles
- Separation of Concerns
- DRY
- KISS
- Composition over inheritance
- Dependency Injection
- Feature modularity
- High cohesion
- Low coupling

Avoid unnecessary complexity.

Avoid premature optimization.

Prefer readability.

---

# GENERAL RULES

You shall:

- Produce production-quality code.
- Prefer official libraries.
- Prefer long-term maintainability over shortcuts.
- Generate meaningful documentation.
- Use descriptive naming.
- Configure all tooling correctly.
- Explain important engineering decisions.

You shall NOT:

- Generate placeholder implementations.
- Leave TODO comments.
- Produce mock business logic.
- Generate unfinished modules.
- Ignore compile errors.
- Skip configuration files.
- Introduce conflicting technologies.

---

# TECHNOLOGY STACK

Use exactly the following stack unless a critical compatibility issue requires a minor adjustment.

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- React Hook Form
- Zod

## Backend

- NestJS
- TypeScript
- MongoDB
- Redis
- Passport
- JWT
- Swagger

## AI

- Python 3.12+
- FastAPI
- LangGraph
- LangChain
- OpenAI SDK

## Infrastructure

- Docker
- Docker Compose
- Kubernetes
- Terraform

## CI/CD

- GitHub Actions

## Package Management

- pnpm
- Turborepo

---

# OPERATING SYSTEM

Primary Development Environment

Windows 11 with WSL2 Ubuntu.

Generated tooling shall be compatible with Linux-based development and deployment.

---

# EXPECTED BEHAVIOR

Work like a senior engineer joining an existing enterprise project.

Do not ask unnecessary questions.

If multiple valid engineering approaches exist:

- Choose the most maintainable.
- Explain your reasoning.
- Continue implementation.

Avoid stopping midway through the task.

---

# DELIVERABLE FOR PHASE 11

At the end of this phase, the repository shall contain:

- Complete monorepo
- Frontend scaffold
- Backend scaffold
- AI scaffold
- Shared packages
- Infrastructure directories
- Development tooling
- Docker configuration
- CI skeleton
- Environment templates
- Successful build configuration

The project shall be ready for Phase 12 (Database Implementation).

---

# STOP CONDITION

Stop immediately after completing the engineering foundation.

Do not implement any business features.

Do not create domain modules.

Do not create controllers for business functionality.

Do not implement authentication.

Do not generate sample business data.

Phase 11 ends when the project foundation is complete and buildable.

# SECTION 2 — ENTERPRISE ARCHITECTURE RULES

---

# Enterprise Architecture

The generated project shall follow Enterprise Software Architecture principles.

The architecture shall prioritize:

- Scalability
- Maintainability
- Modularity
- Testability
- Security
- Performance
- Developer Experience

The generated solution must be capable of supporting future enterprise-scale growth without requiring architectural redesign.

---

# Architectural Style

Use the following architectural patterns.

- Clean Architecture
- Layered Architecture
- Modular Monolith (initial implementation)
- Domain Driven Design (where appropriate)
- Repository Pattern
- Dependency Injection
- SOLID Principles
- Composition over inheritance

Do not use MVC as the primary architectural model.

---

# Monorepo Strategy

The repository shall be implemented as a Turborepo.

The monorepo shall support multiple independently deployable applications while sharing reusable packages.

The repository must support:

- Independent application builds
- Shared packages
- Shared configuration
- Shared types
- Shared UI
- Shared utilities

---

# Repository Layout

The repository shall contain only high-level folders.

Example:

```text
apps/
packages/
infrastructure/
scripts/
docs/
.github/
```

No application-specific folders shall exist at the repository root.

---

# Applications

The repository shall contain exactly three primary applications.

## Web Application

React

Responsibilities:

- User Interface
- Dashboard
- Ticketing
- Administration
- AI Chat

---

## API

NestJS

Responsibilities:

- REST APIs
- Authentication
- Business Logic
- Database Access
- External Integrations

---

## AI Service

FastAPI

Responsibilities:

- AI Agents
- LangGraph
- Tool Calling
- Prompt Execution
- RAG
- AI Evaluation

---

# Shared Packages

Shared packages shall contain reusable code only.

Never place business logic inside shared packages.

Shared packages shall include:

- UI Components
- Shared Types
- Shared Configuration
- Shared Utilities
- SDK (future)

---

# Backend Architecture

The backend shall follow Clean Architecture.

High-level layers:

```text
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

Dependencies shall always point inward.

The Domain layer shall never depend on Frameworks.

---

# Domain Layer

The Domain layer shall contain:

- Entities
- Value Objects
- Domain Interfaces
- Domain Services
- Business Rules

No framework-specific code is allowed inside the Domain layer.

---

# Application Layer

Contains:

- Use Cases
- DTOs
- Commands
- Queries
- Application Services

The Application layer coordinates business workflows.

---

# Infrastructure Layer

Contains:

- MongoDB
- Redis
- Repository Implementations
- External APIs
- Logging
- Configuration

Framework implementations belong only here.

---

# Presentation Layer

Contains:

- Controllers
- REST Endpoints
- Validation
- Request Mapping
- Swagger

No business logic shall exist inside Controllers.

Controllers shall only orchestrate requests.

---

# Frontend Architecture

The React application shall follow Feature-Based Architecture.

Major folders shall include:

- app
- pages
- features
- components
- hooks
- layouts
- services
- stores
- utils
- assets
- styles
- types

Reusable components shall remain independent of business features.

---

# State Management

Separate:

- Server State
- Client State

Server state shall not be stored inside UI state management.

---

# Routing

Use centralized route definitions.

Support:

- Public Routes
- Protected Routes
- Admin Routes

Future expansion shall require minimal routing changes.

---

# AI Architecture

The AI application shall follow modular agent architecture.

Primary areas:

- Agents
- Workflows
- Prompts
- Tools
- Memory
- Retrieval
- Evaluation
- API

Each AI capability shall remain independently testable.

---

# Infrastructure Architecture

Infrastructure shall be isolated from application code.

Infrastructure folders shall contain:

- Docker
- Kubernetes
- Terraform

Application logic shall never exist inside infrastructure folders.

---

# Configuration Strategy

Configuration shall be externalized.

Hardcoded configuration values are prohibited.

Support:

- Local
- Development
- QA
- Staging
- Production

Environment-specific behavior shall be controlled through configuration.

---

# Dependency Rules

Dependencies shall always flow inward.

Forbidden examples:

Presentation → Database

Presentation → MongoDB

Presentation → Redis

Presentation → External APIs

Allowed:

Presentation

↓

Application

↓

Domain

↓

Infrastructure

---

# Cross-Package Dependencies

Applications may depend on shared packages.

Shared packages shall never depend on applications.

Circular dependencies are prohibited.

---

# Error Handling

The project shall use centralized error handling.

Do not scatter exception handling across unrelated modules.

Consistent error responses shall be enforced.

---

# Logging

Logging shall be centralized.

Logging strategy shall support:

- Structured logs
- Correlation IDs
- Log Levels
- Future distributed tracing

Do not use random console logging throughout the project.

---

# Security Architecture

Security shall be implemented by default.

Prepare architecture for:

- JWT
- RBAC
- OAuth
- Secure Headers
- Rate Limiting

Business implementation occurs later.

---

# Testing Architecture

Every layer shall be independently testable.

Prepare project structure for:

- Unit Testing
- Integration Testing
- API Testing
- Frontend Testing
- AI Testing

Do not generate tests for business features during Phase 11.

---

# Documentation

Generate meaningful README files where appropriate.

Avoid placeholder documentation.

Document architectural decisions when useful.

---

# Naming Standards

Use descriptive names.

Avoid abbreviations.

Prefer:

UserManagementModule

instead of

UMModule

Prefer:

IncidentRepository

instead of

Repo1

Names shall communicate intent.

---

# Code Quality

Generated code shall be:

- Readable
- Modular
- Consistent
- Strongly Typed
- Self-documenting

Avoid clever implementations.

Prefer maintainability.

---

# Future Readiness

The architecture shall allow future implementation of:

- Microservices
- Event-driven architecture
- CQRS
- Event Sourcing
- Multi-tenancy
- AI Expansion

without requiring significant restructuring.

---

# Final Architectural Constraint

The generated project foundation shall remain technology-agnostic at the business layer.

Business rules must remain independent of frameworks, databases, cloud providers, and third-party services.

This principle shall guide every architectural decision made during project generation.

# ==========================================================

# SECTION 3

# ENTERPRISE REPOSITORY STRUCTURE

# ==========================================================

The repository shall be implemented as an Enterprise Monorepo.

This repository shall support:

- Independent applications
- Shared packages
- Infrastructure
- AI services
- DevOps
- Future microservices
- CI/CD
- Testing
- Enterprise scalability

No folder shall exist without a clearly defined responsibility.

Every directory must follow the Single Responsibility Principle.

==========================================================
ROOT DIRECTORY
==========================================================

The repository root shall contain ONLY:

apps/
packages/
infrastructure/
docs/
scripts/
.github/

package.json
pnpm-workspace.yaml
turbo.json
docker-compose.yml
.gitignore
.editorconfig
README.md

No business code shall exist at the repository root.

==========================================================
APPS DIRECTORY
==========================================================

The apps directory contains independently deployable applications.

Only these applications shall exist.

apps/

web/
api/
ai/

No shared code belongs inside apps.

Applications must remain independently buildable.

==========================================================
WEB APPLICATION
==========================================================

Technology:

React
TypeScript
Vite

Responsibilities:

Entire User Interface

Contains:

src/

app/
assets/
components/
features/
hooks/
layouts/
lib/
providers/
routes/
services/
stores/
styles/
types/
utils/

public/

Purpose

app/

Application bootstrap.

components/

Reusable UI components.

Never place business logic here.

features/

Business features.

Each feature owns:

pages

components

hooks

services

types

utils

hooks/

Reusable custom hooks.

layouts/

Application layouts.

providers/

React providers.

routes/

Routing configuration.

services/

Frontend API layer.

stores/

Client state only.

Never store server state here.

types/

Frontend-only types.

utils/

Pure utility functions.

assets/

Images

Icons

Fonts

styles/

Global styling.

==========================================================
API APPLICATION
==========================================================

Technology

NestJS

Structure

src/

common/

modules/

domain/

application/

infrastructure/

config/

main.ts

---

common/

Shared backend functionality.

Contains

constants

decorators

exceptions

filters

guards

interceptors

middleware

pipes

validators

logger

Never place business logic here.

---

modules/

Feature modules.

Examples (future)

auth

users

tickets

incidents

analytics

notifications

---

domain/

Enterprise Domain Layer.

Contains

entities

value objects

interfaces

domain services

business rules

No NestJS decorators.

No MongoDB.

No Redis.

No framework code.

---

application/

Application Layer.

Contains

use cases

commands

queries

DTOs

application services

Coordinates domain workflows.

---

infrastructure/

Infrastructure Layer.

Contains

MongoDB

Redis

repository implementations

external APIs

configuration adapters

messaging

storage

Only infrastructure code belongs here.

---

config/

Application configuration.

Environment loading.

Validation.

==========================================================
AI APPLICATION
==========================================================

Technology

Python

FastAPI

LangGraph

Structure

app/

agents/

workflows/

tools/

prompts/

memory/

retrieval/

evaluation/

models/

api/

config/

utils/

Responsibilities

Agents

Tool Calling

RAG

Memory

Prompt Management

Evaluation

API

No frontend code.

No business APIs.

==========================================================
PACKAGES DIRECTORY
==========================================================

Shared reusable packages.

Packages shall NEVER depend on applications.

Packages/

config/

eslint-config/

tsconfig/

types/

ui/

utils/

sdk/

---

config/

Shared runtime configuration.

---

eslint-config/

Shared ESLint rules.

---

tsconfig/

Shared TypeScript configuration.

---

types/

Shared TypeScript types.

No business logic.

---

ui/

Reusable UI components.

Never perform API calls.

Never include feature-specific logic.

---

utils/

Pure helper functions.

No framework dependencies.

---

sdk/

Reserved for future shared SDK.

==========================================================
INFRASTRUCTURE
==========================================================

Contains infrastructure only.

Never place application code here.

Structure

docker/

kubernetes/

terraform/

monitoring/

scripts/

---

docker/

Dockerfiles

Compose

Development containers

---

kubernetes/

Deployments

Services

Ingress

Secrets templates

ConfigMaps

---

terraform/

Infrastructure provisioning.

---

monitoring/

Prometheus

Grafana

Loki

Future observability.

==========================================================
SCRIPTS
==========================================================

Contains automation scripts.

Examples

setup

bootstrap

clean

seed

format

lint

build

==========================================================
DOCS
==========================================================

Contains ONLY documentation.

Architecture

Design

API docs

ADRs

Runbooks

==========================================================
GITHUB
==========================================================

.github/

workflows/

ISSUE_TEMPLATE/

PULL_REQUEST_TEMPLATE/

CODEOWNERS

Dependabot

==========================================================
FOLDER OWNERSHIP RULES
==========================================================

Every folder has one responsibility.

Examples

packages/ui

Only reusable UI.

Never API logic.

packages/utils

Only utilities.

Never business rules.

domain/

Only business rules.

Never framework code.

application/

Only orchestration.

Never database code.

infrastructure/

Only infrastructure.

Never business logic.

common/

Shared technical utilities.

Never business rules.

==========================================================
FORBIDDEN PRACTICES
==========================================================

Do NOT create:

helpers/

misc/

temp/

new/

old/

final/

backup/

random/

Do NOT duplicate utilities.

Do NOT duplicate types.

Do NOT duplicate configuration.

Do NOT duplicate business rules.

==========================================================
DEPENDENCY RULES
==========================================================

Allowed

Web

↓

API

↓

Domain

↓

Infrastructure

Shared Packages

↓

Applications

Forbidden

Applications

↓

Applications

Domain

↓

Infrastructure

Packages

↓

Applications

Circular dependencies.

==========================================================
FINAL REQUIREMENT
==========================================================

Every generated folder must include a clear engineering purpose.

If a folder has no responsibility,
do not create it.

The generated repository structure shall remain scalable for at least the next five years without major restructuring.

# ==========================================================

# SECTION 4

# DEVELOPMENT STANDARDS

# TOOLING

# ENGINEERING GOVERNANCE

# ==========================================================

This section defines the engineering standards that every generated file shall follow.

These standards are mandatory.

The generated project shall be consistent across all applications.

==========================================================
GENERAL ENGINEERING PRINCIPLES
==========================================================

Follow:

- SOLID Principles
- Clean Code
- Clean Architecture
- DRY
- KISS
- Separation of Concerns
- Composition over Inheritance

Every file shall have one responsibility.

Avoid unnecessary abstractions.

Avoid overengineering.

Prefer readability over cleverness.

==========================================================
LANGUAGE STANDARDS
==========================================================

Frontend

TypeScript ONLY.

Backend

TypeScript ONLY.

AI

Python 3.12+

Never use JavaScript unless absolutely required by tooling.

Never use "any" unless there is no safe alternative.

==========================================================
PACKAGE MANAGER
==========================================================

Use pnpm.

Do not use:

npm

yarn

bun

All applications shall share one workspace.

==========================================================
MONOREPO
==========================================================

Use Turborepo.

Configure:

- build
- dev
- lint
- test
- format
- clean

Enable caching where appropriate.

==========================================================
TYPESCRIPT
==========================================================

Use strict mode.

Enable:

strict

noImplicitAny

strictNullChecks

exactOptionalPropertyTypes

noUncheckedIndexedAccess

Do not disable strictness.

Use path aliases.

Avoid relative imports across packages.

==========================================================
PYTHON
==========================================================

Python Version

3.12+

Dependency Manager

uv

Formatting

Ruff

Linting

Ruff

Type Checking

mypy

Virtual Environment

.venv

Follow PEP8.

Use type hints everywhere.

==========================================================
REACT STANDARDS
==========================================================

Framework

React 19

Build Tool

Vite

Styling

Tailwind CSS

UI

shadcn/ui

Routing

React Router

Forms

React Hook Form

Validation

Zod

Data Fetching

TanStack Query

Avoid prop drilling.

Use composition.

Prefer functional components.

No class components.

==========================================================
NESTJS STANDARDS
==========================================================

Use:

Dependency Injection

Modules

Providers

Controllers

Guards

Interceptors

Filters

Validation Pipes

Swagger

Never place business logic inside Controllers.

Controllers shall remain thin.

==========================================================
FASTAPI STANDARDS
==========================================================

Use:

FastAPI

Pydantic

Dependency Injection

Async endpoints

Typed models

Structured routers

No business logic inside routers.

==========================================================
DATABASE STANDARDS
==========================================================

MongoDB

Redis

Environment-driven configuration.

No hardcoded credentials.

Prepare repository interfaces.

Business implementation occurs later.

==========================================================
API STANDARDS
==========================================================

REST

JSON

Versioned APIs

/api/v1/

Use DTOs.

Never expose internal models.

Use consistent error responses.

==========================================================
CONFIGURATION
==========================================================

All configuration must come from environment variables.

Generate:

.env.example

Never commit secrets.

Never hardcode credentials.

Validate environment variables during startup.

==========================================================
DOCKER
==========================================================

Docker-first development.

Generate:

Dockerfiles

docker-compose.yml

Development containers

Health checks

Named volumes

Internal networking

Every application shall run inside Docker.

==========================================================
KUBERNETES
==========================================================

Prepare folders for:

Deployment

Service

Ingress

ConfigMap

Secret

HorizontalPodAutoscaler

Do not implement production manifests yet.

==========================================================
TERRAFORM
==========================================================

Prepare Terraform structure.

Separate:

modules

environments

shared

No cloud resources need implementation during Phase 11.

==========================================================
GIT
==========================================================

Branching

main

develop

feature/*

bugfix/*

hotfix/*

Use Conventional Commits.

Examples

feat:

fix:

docs:

refactor:

test:

build:

ci:

==========================================================
CODE STYLE
==========================================================

Formatting

Prettier

Linting

ESLint

Line Length

100

Indentation

2 spaces

Use semicolons.

Use single quotes unless tooling requires otherwise.

==========================================================
IMPORT RULES
==========================================================

Prefer absolute imports.

Avoid deep relative paths.

Group imports consistently.

No circular imports.

==========================================================
NAMING CONVENTIONS
==========================================================

Folders

kebab-case

Files

kebab-case

React Components

PascalCase

Classes

PascalCase

Interfaces

PascalCase

Functions

camelCase

Variables

camelCase

Constants

UPPER_SNAKE_CASE

Enums

PascalCase

==========================================================
ERROR HANDLING
==========================================================

Centralized error handling.

No silent failures.

No empty catch blocks.

Meaningful error messages.

==========================================================
LOGGING
==========================================================

Structured logging only.

No random console.log statements.

Support log levels:

debug

info

warn

error

==========================================================
TESTING
==========================================================

Frontend

Vitest

Backend

Jest

API

Supertest

AI

pytest

End-to-End

Playwright

Prepare configuration only.

No business tests yet.

==========================================================
SECURITY
==========================================================

Prepare for:

JWT

RBAC

Helmet

CORS

Rate Limiting

Input Validation

Environment Validation

Secret Management

No authentication implementation yet.

==========================================================
DOCUMENTATION
==========================================================

Generate meaningful README files.

Document:

How to run

How to build

How to develop

How to test

How to contribute

==========================================================
CI/CD
==========================================================

Prepare GitHub Actions.

Pipelines

Install

Lint

Build

Test

Docker Validation

Do not deploy during Phase 11.

==========================================================
QUALITY GATES
==========================================================

Every generated project must:

Compile

Lint successfully

Format successfully

Pass configuration validation

Support local development

Support Docker development

==========================================================
FORBIDDEN PRACTICES
==========================================================

Do not generate:

TODO

FIXME

Placeholder implementations

Temporary hacks

Commented code

Unused dependencies

Unused folders

Magic numbers

Hardcoded secrets

==========================================================
ENGINEERING EXPECTATION
==========================================================

Generate code that a Senior Software Engineer would approve during a production code review.

The resulting project shall appear as if it was created by an experienced enterprise engineering team rather than an AI code generator.

# ==========================================================

# SECTION 5

# IMPLEMENTATION EXECUTION PLAN

# ==========================================================

You are now entering the implementation phase.

Execute every task sequentially.

Do NOT skip tasks.

Do NOT reorder tasks.

Do NOT stop after completing one task.

Continue until every task is complete.

Only stop when the Definition of Done has been achieved.

==========================================================
TASK 1
Repository Initialization
==========================================================

Create the enterprise repository.

Generate:

README.md

.gitignore

.editorconfig

.gitattributes

LICENSE (MIT)

package.json

pnpm-workspace.yaml

turbo.json

docker-compose.yml

Verify repository integrity.

---

Expected Result

Repository initialized successfully.

==========================================================
TASK 2
Root Folder Structure
==========================================================

Generate every required root folder.

apps/

packages/

infrastructure/

scripts/

docs/

.github/

No additional folders.

---

Expected Result

Repository structure complete.

==========================================================
TASK 3
Workspace Configuration
==========================================================

Configure:

pnpm workspace

Turbo

Shared scripts

Root commands

Build pipeline

Lint pipeline

Formatting pipeline

Test pipeline

Clean pipeline

Verify workspace configuration.

---

Expected Result

Workspace operational.

==========================================================
TASK 4
Frontend Initialization
==========================================================

Generate React application.

Configure:

React

TypeScript

Vite

Tailwind

shadcn/ui

TanStack Query

React Router

React Hook Form

Zod

Prepare project structure.

Do NOT implement business pages.

---

Expected Result

Frontend compiles.

==========================================================
TASK 5
Backend Initialization
==========================================================

Generate NestJS application.

Configure:

NestJS

Swagger

Validation

Logging

Configuration

Environment loading

Dependency Injection

Prepare Clean Architecture folders.

Do NOT implement business modules.

---

Expected Result

Backend compiles.

==========================================================
TASK 6
AI Service Initialization
==========================================================

Generate Python application.

Configure:

FastAPI

LangGraph

LangChain

OpenAI SDK

Project structure

Dependency management

Configuration

Prepare agent folders.

Do NOT implement AI agents.

---

Expected Result

AI service starts successfully.

==========================================================
TASK 7
Shared Packages
==========================================================

Generate shared packages.

config

eslint-config

tsconfig

types

ui

utils

sdk

Configure workspace dependencies.

Verify package sharing.

---

Expected Result

Packages build successfully.

==========================================================
TASK 8
Infrastructure
==========================================================

Generate infrastructure folders.

Docker

Docker Compose

Terraform

Kubernetes

Monitoring

Scripts

Prepare future deployment structure.

Do not deploy infrastructure.

---

Expected Result

Infrastructure ready.

==========================================================
TASK 9
Docker Development Environment
==========================================================

Generate:

Frontend Dockerfile

Backend Dockerfile

AI Dockerfile

docker-compose.yml

Networking

Volumes

Health checks

Environment support

Verify Docker configuration.

---

Expected Result

Containers start successfully.

==========================================================
TASK 10
Development Tooling
==========================================================

Configure:

ESLint

Prettier

Husky

lint-staged

Commitlint

Shared TypeScript

Python tooling

Root scripts

Verify tooling.

---

Expected Result

Development tooling operational.

==========================================================
TASK 11
Environment Configuration
==========================================================

Generate:

.env.example

Application environment templates

Configuration validation

Documentation

Never generate secrets.

---

Expected Result

Environment ready.

==========================================================
TASK 12
GitHub Configuration
==========================================================

Generate:

GitHub Actions

Issue Templates

Pull Request Template

CODEOWNERS

Dependabot

CI skeleton

No deployment workflows.

---

Expected Result

GitHub configuration complete.

==========================================================
TASK 13
Documentation
==========================================================

Generate:

Repository README

Application READMEs

Development Guide

Getting Started Guide

Folder explanation

How to run

How to build

How to test

How to contribute

---

Expected Result

Documentation complete.

==========================================================
TASK 14
Validation
==========================================================

Validate:

Workspace

Frontend

Backend

AI

Shared packages

Docker

Configuration

Build

Lint

Formatting

Verify no missing dependencies.

---

Expected Result

Entire repository validates successfully.

==========================================================
TASK 15
Final Cleanup
==========================================================

Remove:

Unused files

Unused packages

Duplicate configuration

Placeholder code

Temporary files

Verify project consistency.

---

Expected Result

Clean repository.

==========================================================
TASK EXECUTION RULES
==========================================================

After every task:

Validate

Continue

Do not stop.

Never ask for confirmation.

Never ask implementation questions.

Make reasonable engineering decisions.

Continue automatically.

==========================================================
PROJECT RULES
==========================================================

Do not implement

Authentication

Users

Tickets

Incidents

Notifications

Analytics

Payments

Dashboards

Business APIs

AI Agents

Business Database Models

CRUD

==========================================================
PHASE 11 OUTPUT
==========================================================

Produce:

Complete enterprise monorepo

Production-ready project structure

Working frontend

Working backend

Working AI service

Docker environment

Workspace

Tooling

Documentation

CI skeleton

Configuration

Nothing else.

==========================================================
END OF IMPLEMENTATION
==========================================================

Stop immediately after the engineering foundation has been completed.

Do not continue into Phase 12.

Wait for further instructions.

# ==========================================================

# SECTION 6

# ACCEPTANCE CRITERIA

# DEFINITION OF DONE

# OUTPUT REQUIREMENTS

# ==========================================================

This section defines when Phase 11 is considered successfully completed.

Do not stop implementation until every acceptance criterion has been satisfied.

==========================================================
PRIMARY OBJECTIVE
==========================================================

The objective of Phase 11 is NOT to implement business functionality.

The objective is to establish a production-ready engineering foundation that future implementation phases will build upon.

The resulting repository must resemble the initial engineering foundation of an enterprise software product.

==========================================================
ACCEPTANCE CRITERIA
==========================================================

The following deliverables are mandatory.

Repository

✓ Repository initialized

✓ Monorepo configured

✓ pnpm workspace operational

✓ Turborepo operational

✓ Shared scripts configured

---

Applications

✓ Web application initialized

✓ Backend application initialized

✓ AI application initialized

✓ Applications build independently

✓ Applications run independently

---

Packages

✓ Shared packages created

✓ Package dependencies configured

✓ Shared configuration operational

✓ Shared TypeScript configuration operational

✓ Shared ESLint configuration operational

---

Infrastructure

✓ Docker configuration completed

✓ Docker Compose completed

✓ Kubernetes structure prepared

✓ Terraform structure prepared

✓ Monitoring structure prepared

---

Development Tooling

✓ ESLint configured

✓ Prettier configured

✓ Husky configured

✓ lint-staged configured

✓ Commitlint configured

✓ EditorConfig configured

---

Configuration

✓ Environment templates generated

✓ Configuration validation implemented

✓ No secrets committed

✓ Environment loading prepared

---

Documentation

✓ Root README

✓ Application READMEs

✓ Development Guide

✓ Contribution Guide

✓ Setup Guide

✓ Folder documentation

---

CI/CD

✓ GitHub Actions generated

✓ CI validation prepared

✓ Build workflow prepared

✓ Test workflow prepared

✓ Docker validation prepared

---

Project Quality

✓ Clean Architecture prepared

✓ Folder structure follows governance

✓ Naming conventions applied

✓ No duplicate configuration

✓ No unnecessary dependencies

✓ No placeholder implementations

==========================================================
BUILD VALIDATION
==========================================================

The generated project shall support:

pnpm install

pnpm build

pnpm lint

pnpm format

pnpm test

turbo build

turbo lint

turbo test

without configuration errors.

==========================================================
DOCKER VALIDATION
==========================================================

The following shall execute successfully.

docker compose up

docker compose down

Every container shall:

Start successfully

Pass health checks

Join the correct network

Use persistent volumes where required

Load environment variables correctly

==========================================================
CODE QUALITY REQUIREMENTS
==========================================================

Generated code shall:

Compile

Be formatted

Be linted

Use strict typing

Avoid dead code

Avoid commented code

Avoid placeholder implementations

Avoid TODO

Avoid FIXME

Avoid magic numbers

Avoid hardcoded secrets

Avoid duplicated utilities

==========================================================
ENGINEERING QUALITY
==========================================================

Every generated file shall appear to have been written by a Senior Software Engineer.

The generated repository shall not resemble a toy project or tutorial.

The architecture shall remain maintainable for long-term enterprise development.

==========================================================
FORBIDDEN OUTPUT
==========================================================

Do NOT generate:

Authentication

CRUD

Users

Tickets

Incidents

Analytics

Notifications

Payments

AI Agents

Business APIs

Business Database Models

Sample Business Logic

Business Tests

Mock Production Data

Phase 11 is ONLY the engineering foundation.

==========================================================
DEFINITION OF DONE
==========================================================

Phase 11 is complete only if:

✓ Repository builds successfully

✓ Frontend starts successfully

✓ Backend starts successfully

✓ AI service starts successfully

✓ Shared packages compile

✓ Docker starts correctly

✓ Workspace commands execute

✓ CI configuration exists

✓ Tooling configured

✓ Documentation completed

✓ Folder structure follows specification

✓ No architecture violations

✓ No compile errors

✓ No lint errors

✓ No dependency conflicts

✓ No unfinished implementation

==========================================================
FINAL OUTPUT FORMAT
==========================================================

After completing implementation, produce a final engineering report.

The report shall include:

1. Repository Overview

2. Folder Structure Summary

3. Technology Summary

4. Workspace Configuration Summary

5. Applications Generated

6. Shared Packages Generated

7. Infrastructure Generated

8. Development Tooling Configured

9. Docker Configuration Summary

10. CI/CD Summary

11. Validation Results

12. Known Limitations

13. Recommended Next Phase

The report shall NOT contain source code.

==========================================================
STOP CONDITION
==========================================================

Immediately stop after the engineering report.

Do not continue into Database Implementation.

Do not continue into Authentication.

Do not generate additional business modules.

Wait for the next implementation phase.

==========================================================
FINAL INSTRUCTION
==========================================================

Treat this project as if you are delivering the engineering foundation for a real enterprise product that will be maintained for many years.

Make conservative, maintainable, production-oriented engineering decisions.

Whenever multiple valid options exist:

Choose the option that improves long-term maintainability, consistency, developer productivity, and scalability.

Quality is more important than speed.

Completeness is more important than brevity.

Do not sacrifice architecture for convenience.
