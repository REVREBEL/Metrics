# Metrics

Metrics is a Next.js application for hotel commercial intelligence.

## Development

```bash
pnpm dev
```

## Postgres app-state foundation

Metrics includes a Postgres app-state layer backed by Drizzle ORM. BigQuery/Dataform remains the source of truth for analytical `metrics_core` tables, while Postgres stores app-owned workflow state.

### Environment variables

```bash
DATABASE_URL=postgres://user:password@localhost:5432/metrics
POSTGRES_POOL_MAX=10
```

### Database commands

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
pnpm db:seed
```

- Drizzle schema: `src/db/schema/index.ts`
- DB client entrypoint: `src/db/index.ts`
- Migrations: `src/db/migrations`

For additional project context and table inventory details, see:

- `docs/project-overview.md`
- `docs/dataform-table-inventory.md`
