# Contributing

1. Branch from `develop` using `feature/`, `bugfix/`, or `hotfix/` as appropriate.
2. Keep commits Conventional Commit compliant, such as `build: configure workspace tooling`.
3. Keep business behavior out of shared packages and preserve Clean Architecture dependency direction.
4. Externalize configuration and never commit a secret or a populated `.env` file.
5. Run all quality gates before opening a pull request.
6. Complete the pull request template with validation and architecture/security checks.

Changes that introduce a business capability require the relevant phase specification and must not be
mixed into platform-foundation work.
