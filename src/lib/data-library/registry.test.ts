import { describe, expect, it } from "vitest"

import { dataLibraryTableRegistry, getDataLibraryTableDefinition } from "./registry"

describe("data library registry", () => {
  it("registers the lookup and mapping vertical slice", () => {
    expect(getDataLibraryTableDefinition("metrics_core.lkp_segment")?.category).toBe("lookup")
    expect(getDataLibraryTableDefinition("metrics_core.map_segment")?.category).toBe("mapping")
  })

  it("gives every definition a key and immutable concurrency column", () => {
    for (const definition of dataLibraryTableRegistry) {
      expect(definition.primaryKey.length).toBeGreaterThan(0)
      expect(definition.columns.find((column) => column.key === "updated_at")).toMatchObject({
        editable: false,
        required: true,
      })
    }
  })

  it("declares dependencies for editable governed codes", () => {
    const mapping = getDataLibraryTableDefinition("metrics_core.map_segment")
    expect(mapping?.columns.find((column) => column.key === "standard_code")?.lookupDependency).toBe(
      "metrics_core.lkp_segment"
    )
  })
})
