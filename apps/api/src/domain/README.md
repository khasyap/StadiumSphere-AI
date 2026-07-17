# Domain layer

Phase 12.3 provides framework-independent domain primitives: entities, aggregate roots, identifiers,
value objects, validation exceptions, domain-event contracts, and shared interfaces. It has no
persistence mappings, controllers, DTOs, authentication, or event publishing.

Domain events are collected by aggregate roots for a later application-layer integration. This layer
does not publish events or contain business workflows.
