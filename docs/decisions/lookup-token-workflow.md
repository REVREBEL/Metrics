# Decision: Lookup-Driven Token Workflow

## Status

Accepted for implementation planning.

## Decision

Lookup tables should support optional visual color metadata so standardized lookup values can drive the Metrics UI token system without hardcoding every display color in React components.

## Proposed lookup fields

```txt
color_hex
color_inverse_hex
color_variance_hex
color_token_key
```

- `color_hex` is the primary display color.
- `color_inverse_hex` is the foreground or icon color used on top of `color_hex`.
- `color_variance_hex` is the supporting comparison/accent color.
- `color_token_key` is the stable semantic token key used by the UI, for example `room-category-suite` or `bed-type-king`.

## Named lookup values

These categories are standardized once lookup tables are in place, so they can use named source keys.

```txt
room-category-room
room-category-suite
room-category-studio
room-category-villa
room-category-residence
room-category-accessible
room-category-other

room-class-standard
room-class-deluxe
room-class-premium
room-class-executive
room-class-best
room-class-upgrade
room-class-other

room-feature-none
room-feature-view
room-feature-balcony
room-feature-corner
room-feature-high-floor
room-feature-low-floor
room-feature-accessible
room-feature-other

bed-type-king
bed-type-queen
bed-type-double
bed-type-twin
bed-type-multiple
bed-type-other
```

## Bucketed room type values

Room type names and codes are property-specific and can be too granular for global color naming. The UI should continue to map them into generic visual buckets.

```txt
room-type-room-type-1
room-type-room-type-2
room-type-room-type-3
room-type-room-type-4
```

The granular room type name/code remains in the lookup/data layer. The UI receives the assigned bucket.

## CSS generation workflow

```txt
Lookup UI save
  -> validate hex fields
  -> store lookup row metadata
  -> generate token payload
  -> write/update a generated CSS token file
  -> app consumes generated tokens through source-aware CSS variables
```

Do not write user-edited lookup colors directly into hand-maintained source files like:

```txt
src/styles/metric-theme-tokens.css
src/styles/metric-theme-sources.css
```

Generate a dedicated file instead:

```txt
src/styles/generated/lookup-source-tokens.css
```

Then import that generated file after the base token files.

## Example generated CSS

```css
@layer components {
  :root {
    --color-room-category-suite-normal: #E4782E;
    --color-room-category-suite-inverse: #FFFFFF;
    --color-room-category-suite-var: #FAD644;
  }
}
```

## Save-time validation rules

- Accept only `#RGB`, `#RRGGBB`, or empty values.
- Normalize saved values to uppercase `#RRGGBB`.
- Reject non-hex strings.
- Require `color_hex` before accepting `color_inverse_hex` or `color_variance_hex`.
- If inverse is empty, compute or fall back to an accessible foreground token.
- If variance is empty, use the primary color as the default variance color.

## Git-backed generation path

For the first implementation, the safest generation path is Git-backed:

1. User edits lookup colors in the UI.
2. App saves metadata to Postgres draft state.
3. User publishes lookup changes.
4. Server action generates `lookup-source-tokens.css`.
5. Server action opens or updates a GitHub PR against the Metrics repo.
6. Review/merge deploys the updated token file.

A later implementation can add runtime CSS injection for immediate previews, but committed generated CSS should remain the durable production path.

## Component contract

Components should keep using source-aware props rather than raw colors.

```tsx
<MetricCard sourceType="room-category" source="suite" />
<MetricLayout sourceType="bed-type" source="king" />
<MetricCard sourceType="room-type" source="room-type-1" />
```

The source token stack remains:

```txt
lookup row metadata
  -> semantic token key
  -> generated CSS token
  -> metric source CSS mapping
  -> runtime component variables
  -> component rendering
```

Runtime component variables remain:

```css
--source-normal
--source-inverse
--source-variance
--metric-color
--metric-inverse-color
--metric-variance-color
```
