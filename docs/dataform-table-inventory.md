# Dataform Table Inventory for Lookup Table Manager

This document captures the current Dataform-created tables that should guide the first Lookup Table Manager implementation in Metrics.

## Scope

REV-6 should focus on the Dataform-created `metrics_core` tables from `REVREBEL/Metrics-Dataform`.

GA4 native sync/export tables and future GA4 curated tables are intentionally out of scope for the first Lookup Table Manager build.

## Source Repository

```text
REVREBEL/Metrics-Dataform
```

## Dataform Configuration

From `workflow_settings.yaml`:

```yaml
defaultProject: revrebel-metrics
defaultDataset: stg
defaultAssertionDataset: dataform_assertions
defaultLocation: us-central1
dataformCoreVersion: 3.0.0
```

The Lookup Table Manager should primarily model tables created in:

```text
revrebel-metrics.metrics_core
```

## Dataform Files to Inspect

```text
REVREBEL/Metrics-Dataform/definitions/00_create_core_tables.sqlx
REVREBEL/Metrics-Dataform/definitions/05_create_segment_tables.sqlx
REVREBEL/Metrics-Dataform/definitions/06_create_source_channel_rate_tables.sqlx
REVREBEL/Metrics-Dataform/definitions/05_create_global_settings_event_lookups.sqlx
```

## Core Dimensions and Dictionaries

```text
metrics_core.dim_property
metrics_core.dim_date
metrics_core.dim_segment
metrics_core.dim_roomtype
metrics_core.dim_metric
metrics_core.dim_source_report
```

## Segment Lookups and Mapping

```text
metrics_core.lkp_segment_group
metrics_core.lkp_segment
metrics_core.lkp_finance_segment
metrics_core.map_segment
metrics_core.vw_segment
```

## Room Type Mapping

```text
metrics_core.map_roomtype
```

## Source, Channel, and Rate Lookups

```text
metrics_core.lkp_consortia_category
metrics_core.lkp_consortia_focus
metrics_core.lkp_consortia
metrics_core.lkp_agency
metrics_core.lkp_industry
metrics_core.lkp_company
metrics_core.lkp_source
metrics_core.lkp_subsource
metrics_core.lkp_channel_group
metrics_core.lkp_channel
metrics_core.lkp_ratetype
metrics_core.lkp_rate
```

## Source, Channel, and Rate Mapping Views

```text
metrics_core.map_source
metrics_core.map_rate
metrics_core.vw_source
metrics_core.vw_rate
```

## Source, Report, and Metric Type Lookups

```text
metrics_core.lkp_source_system
metrics_core.lkp_report_type
metrics_core.lkp_metric_type
```

## Event Lookup Tables

```text
metrics_core.lkp_event_category
metrics_core.lkp_event_impact
```

## Suggested UI Groups

The first Lookup Table Manager UI can group the tables as:

```text
Properties
Segments
Room Types
Sources and Channels
Rates
Companies and Agencies
Events
Metrics and Source Reports
```

## REV-6 Out of Scope

Keep the following out of scope for the first Lookup Table Manager build:

```text
GA4 native sync tables
GA4 curated or extracted tables
GA4 source, medium, campaign, event, or page mapping
BigQuery writeback implementation
approval workflow
bulk import/export
```

## Implementation Guidance

If live BigQuery reads/writes are not ready, use fixtures based on these Dataform table definitions.

The first implementation should keep metadata separate from UI components so the app can later replace fixtures with a real metadata/read/write service.

Recommended abstractions:

```text
lookupTableDefinitions
lookupTableRows
lookupTableService
lookupTable.schema.ts
```

The PR should document:

```text
Which Dataform tables are included in the first table inventory
Which fields are read-only vs editable in the mock scaffold
Where the service boundary is for future reads and writes
That GA4 is intentionally out of scope for this first build
```