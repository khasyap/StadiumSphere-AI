# Kubernetes foundation

This directory is the governed destination for future deployment, service, ingress, ConfigMap, Secret,
and HorizontalPodAutoscaler manifests. Phase 11 deliberately does not create production manifests:
deployment values and secret references require environment-specific platform approval.

Future manifests should be organized by a reusable base and environment overlays, consume externalized
configuration, and retain the technical health endpoints introduced in this phase.
