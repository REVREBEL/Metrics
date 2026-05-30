# Tabler-Only Icon Migration TODO (Jules Handoff)

## Objective
Enforce `@tabler/icons-react` as the **only** icon source in `src/`.

## Ground Rules
- Keep behavior and layout unchanged.
- Update imports and JSX references together in each file.
- Use `as` aliases when needed to preserve existing JSX names.
- Do not modify non-icon business logic.

## Batch 1: Fix Tabler import/name mismatches first (build blockers)
- [ ] Replace invalid Tabler exports (`Icon*Icon`, `IconTrash2`, `IconArrowUpDown`, etc.) with valid exports.
- [ ] Align JSX usages to the imported names (or alias imports to match current JSX).
- [ ] Prioritize files currently failing TS with icon-related errors.

## Batch 2: Remove non-Tabler packages in app code
- [ ] Replace `lucide-react` imports with Tabler equivalents.
- [ ] Replace `@radix-ui/react-icons` imports with Tabler equivalents.
- [ ] Replace `@hugeicons/core-free-icons` usage with Tabler equivalents.
- [ ] Remove `IconHugeiconsIcon` imports/usages and replace with direct Tabler icons.

## Batch 3: Remove custom icon asset sources used as UI icons
- [ ] Replace UI icon usages from:
  - `@/assets/RebelIconsReact/*`
  - `@/assets/ShadowIconsReact/*`
  - `@/assets/SocialIconsReact/*`
  - `@/assets/ChannelIconsReact/*`
  - `@/assets/BrowserIconsReact/*`
- [ ] Keep source-system/raw data fields untouched; this is UI icon migration only.

## Verification
- [ ] Run:
  - `pnpm -s tsc --noEmit`
- [ ] Confirm no icon-source violations remain:
  - `rg -n "@hugeicons|lucide-react|@radix-ui/react-icons|RebelIconsReact|ShadowIconsReact|SocialIconsReact|ChannelIconsReact|BrowserIconsReact" src`
- [ ] Confirm Tabler import validity and naming consistency:
  - `pnpm -s tsc --noEmit 2>&1 | rg "tabler|has no exported member|Cannot find name '.*Icon|Cannot find name '.*Arrow|Cannot find name '.*Check"`

## Completion Criteria
- [ ] All icon imports in `src/` are from `@tabler/icons-react`.
- [ ] No TypeScript icon import/identifier mismatches remain.
- [ ] App compiles at least to the point where remaining failures are non-icon related.
