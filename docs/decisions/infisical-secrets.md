# Decision: Infisical for Secrets Management

## Status

Accepted for implementation planning.

## Decision

Use Infisical (`https://app.infisical.com/`) as the shared secrets management layer across Metrics-related platforms and deployment targets.

The goal is to avoid scattering sensitive runtime configuration across local `.env` files, Replit, Vercel, GitHub Actions, local agent shells, and future workers without a common source of truth.

## Scope

Infisical should become the canonical management layer for shared project configuration that must not be committed to the repo, including:

- Database connection configuration
- Cloud platform configuration
- Auth provider configuration
- Model provider configuration
- Integration configuration
- Webhook verification configuration
- Deployment variables
- Worker/runtime configuration

## Operating rule

Application code should reference environment variable names only. Values should not be committed to the repository, copied into documentation, pasted into tickets, or stored in generated files.

Each platform can still receive injected environment variables, but Infisical should be the system used to manage and synchronize them.

## Implementation notes

- Keep `.env.example` limited to variable names and non-sensitive placeholders.
- Use environment-scoped values for local, preview, staging, and production.
- Prefer platform integrations where available.
- Document the required variable names near each service integration.
- Do not expose Infisical project IDs, tokens, or secret values in source-controlled docs.
