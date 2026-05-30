# Metrics Agent Guide

Metrics uses `property` as the canonical internal term for lodging assets.

Use `property`, `properties`, `propertyId`, `property_id`, `propertyProfiles`, `property_profiles`, and `/properties` for app-owned code.

Avoid introducing new app-owned names such as `hotel`, `hotels`, `hotelId`, `hotel_id`, `hotelProfiles`, `hotel_profiles`, or `/hotels`.

Source-system exception: `hotel` may appear only when preserving an upstream vendor field or external dataset name, such as `ideas_hotel_code`, `synxis_hotel_code`, `str_hotel_id`, `raw_hotel_name`, or an existing external schema like `dev_hotel_analytics`.

Before finishing schema, route, model, seed, fixture, or docs changes, search changed files for legacy hotel naming and either convert it to property terminology or mark it as a source-system exception.
