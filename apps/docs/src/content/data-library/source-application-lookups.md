---
title: Source Application Lookups
description: Canonical source application naming and mapping-table relationships.
---

# Source Application Lookups

Metrics uses two lookup levels to identify where source data originates.

```text
mapping_table.source_application_code
  -> metrics_core.lkp_source_application.code
  -> metrics_core.lkp_source_system_type.code
```

## Canonical field name

All mapping tables use:

```text
source_application_code
```

Do not introduce `source_system`, `system`, or `source_system_category` as alternate mapping-table source fields.

## Lookup tables

### `metrics_core.lkp_source_system_type`

Defines the broad application type, such as PMS, CRS, RMS, RateShop, Marketing, Finance, Sales, Web, or Manual.

Standard columns:

```text
code
name
description
sort
is_active
insert_date
updated_date
```

### `metrics_core.lkp_source_application`

Defines the specific application, such as OPERA, IDeaS, SynXis, or Lighthouse.

Standard columns:

```text
code
name
short_name
description
sort
source_system_type_code
vendor
is_active
insert_date
updated_date
```

`source_system_type_code` joins to `lkp_source_system_type.code`.

## Mapping-table reference

| Mapping table | Source application column | Lookup |
|---|---|---|
| `map_segment` | `source_application_code` | `lkp_source_application.code` |
| `map_channel` | `source_application_code` | `lkp_source_application.code` |
| `map_roomtype` | `source_application_code` | `lkp_source_application.code` |
| `map_source` | `source_application_code` | `lkp_source_application.code` |
| `map_market` | `source_application_code` | `lkp_source_application.code` |
| `map_rate` | `source_application_code` | `lkp_source_application.code` |
| `map_agency` | `source_application_code` | `lkp_source_application.code` |

## Hotel mapping exception

`map_hotel` does not include `source_application_code`. It maps property identifiers directly to `dim_property`.

## Agent rule

When reading or generating mapping-table schemas:

1. Treat `source_application_code` as the only valid source-application foreign key.
2. Resolve application details through `lkp_source_application`.
3. Resolve the broad application type through `lkp_source_application.source_system_type_code`.
4. Do not add a source-application column to `map_hotel`.
