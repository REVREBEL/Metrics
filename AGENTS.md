# Metrics Agent Guide

Metrics uses `property` as the canonical internal term for lodging assets.

Use `property`, `properties`, `propertyId`, `property_id`, `propertyProfiles`, `property_profiles`, and `/properties` for app-owned code.

Avoid introducing new app-owned names such as `hotel`, `hotels`, `hotelId`, `hotel_id`, `hotelProfiles`, `hotel_profiles`, or `/hotels`.

## Table scoping rule

Every app-owned table that stores property-scoped data must include `property_code` as a required column unless the table is a true lookup/reference table.

Use `property_code` as the stable business key for property-scoped facts, mappings, notes, events, tasks, campaigns, strategies, settings, and imported/transformed data.

`property_id` may be used for relational joins to `property_profiles.id`, but it does not replace the requirement for `property_code` on property-scoped tables.

Lookup/reference table exceptions include global tables such as role enums, status definitions, metric definitions, channel lookups, segment lookups, event category lookups, and other tables where rows are intentionally not scoped to a single property.

When creating a new table, agents must classify it as either:

- Property-scoped table: requires `property_code`.
- Global lookup/reference table: does not require `property_code`.

Source-system exception: `hotel` may appear only when preserving an upstream vendor field or external dataset name, such as `ideas_hotel_code`, `synxis_hotel_code`, `str_hotel_id`, `raw_hotel_name`, or an existing external schema like `dev_hotel_analytics`.

Before finishing schema, route, model, seed, fixture, or docs changes, search changed files for legacy hotel naming and either convert it to property terminology or mark it as a source-system exception.
