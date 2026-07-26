# Data Library governance framework

## Implemented surface

The authenticated application exposes lookup tables at `/data-library/lookups` and mapping tables at `/data-library/mappings`. Both use the existing Metrics shell. The reusable definition contract lives in `src/lib/data-library/registry.ts`; it is the application-owned allowlist and rendering/validation contract. `data_library_tables` supplements that contract with database-managed display metadata, but database rows cannot expose arbitrary warehouse tables.

The initial governed vertical slice registers `metrics_core.lkp_segment` and `metrics_core.map_segment`. BigQuery/Dataform owns their current values. The registry records their grain, logical key, editable fields, read-only source fields, lookup dependencies, permissions, and `updated_at` concurrency field. The legacy fixture-backed screens remain scaffolding where a warehouse read adapter is unavailable; they are not a claim that fixture values are authoritative.

## Application database workflow

The repository migration and Drizzle schema define all confirmed workflow tables: `data_library_tables`, `lookup_table_draft_edits`, `lookup_table_change_requests`, `app_audit_log`, `app_users`, and `user_roles`. No difference between the listed deployed foundation and repository-owned definitions was found during this implementation. Deployed constraints and columns still need environment-level verification before tightening statuses or adding database constraints.

Draft row payloads belong in `lookup_table_draft_edits`, linked to the allowlisted table through `data_library_tables`. Submission/review records belong in `lookup_table_change_requests`, and workflow actions use `app_audit_log`. The current schema has one change request per draft edit and uses the existing `pending` status default; grouping multiple draft IDs into one request is therefore unresolved and requires an approved schema change rather than an invented parallel model.

## Permissions and service boundary

Existing Data Library permission keys gate view, edit, review, and publish capabilities. Enforcement is currently `audit_only`, consistent with the repository permission service; this is not role-backed authorization yet. Server actions call server-side services, and browser code does not write to BigQuery.

`DataLibraryPublicationAdapter` is the controlled server-side publication boundary. The default adapter deliberately rejects publication because no approved warehouse publication service exists. Publication, full audit-history browsing, bulk import/export, and automatic unmapped-code detection remain deferred.

## Validation and conflicts

Definitions identify required fields, immutable fields, and lookup dependencies. Draft validation must reject missing required values, edits to read-only fields, and unknown dependency values. The initial definitions use `updated_at` as the optimistic concurrency token: a save must compare the submitted last-known value with the current warehouse value. The existing generic lookup screen validates active mapped values and note length; complete registry-derived validation and warehouse conflict enforcement remain planned until the warehouse read adapter replaces fixtures.
