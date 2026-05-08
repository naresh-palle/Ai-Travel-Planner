## Modules (clean architecture)

This folder is where feature modules live. Each module should keep a strict boundary:

- `domain/`: entities, value objects, pure business rules (no framework imports)
- `application/`: use-cases, orchestrations (calls repositories/ports)
- `infrastructure/`: Prisma/HTTP/3rd-party implementations (adapters)
- `ui/`: React components for the module (presentation)

Cross-cutting concerns belong in `lib/` (env, db, api client, utils).

