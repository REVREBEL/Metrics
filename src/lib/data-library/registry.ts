export type DataLibraryTableCategory = "lookup" | "mapping"

export type DataLibraryColumnType = "string" | "boolean" | "timestamp"

export type DataLibraryColumnDefinition = {
  key: string
  label: string
  type: DataLibraryColumnType
  editable: boolean
  required: boolean
  description: string
  lookupDependency?: string
}

export type DataLibraryTableDefinition = {
  key: string
  dataset: string
  table: string
  category: DataLibraryTableCategory
  group: string
  title: string
  description: string
  grain: string
  primaryKey: string[]
  columns: DataLibraryColumnDefinition[]
  permissions: {
    read: string[]
    edit: string[]
    review: string[]
    publish: string[]
  }
  currentValueOwner: "bigquery-dataform" | "application"
  publication: "deferred" | "supported"
}

const commonPermissions = {
  review: ["data_library.lookup_tables.review"],
  publish: ["data_library.lookup_tables.publish"],
}

export const dataLibraryTableRegistry = [
  {
    key: "metrics_core.lkp_segment",
    dataset: "metrics_core",
    table: "lkp_segment",
    category: "lookup",
    group: "Segments",
    title: "Segments",
    description: "Governed commercial segment values used by segment mappings.",
    grain: "One row per standard segment code.",
    primaryKey: ["segment_code"],
    columns: [
      { key: "segment_code", label: "Segment code", type: "string", editable: false, required: true, description: "Stable standard segment code." },
      { key: "segment_name", label: "Segment name", type: "string", editable: true, required: true, description: "Business-facing segment name." },
      { key: "segment_group_code", label: "Segment group", type: "string", editable: true, required: true, lookupDependency: "metrics_core.lkp_segment_group", description: "Parent segment group code." },
      { key: "is_active", label: "Active", type: "boolean", editable: true, required: true, description: "Whether the value is available for current mappings." },
      { key: "updated_at", label: "Updated", type: "timestamp", editable: false, required: true, description: "Warehouse concurrency value." },
    ],
    permissions: {
      read: ["data_library.lookup_tables.view"],
      edit: ["data_library.lookup_tables.edit"],
      ...commonPermissions,
    },
    currentValueOwner: "bigquery-dataform",
    publication: "deferred",
  },
  {
    key: "metrics_core.map_segment",
    dataset: "metrics_core",
    table: "map_segment",
    category: "mapping",
    group: "Segments",
    title: "Segment mappings",
    description: "Maps source-application segment codes to governed segment values.",
    grain: "One row per source application and source segment code.",
    primaryKey: ["source_application_code", "source_code"],
    columns: [
      { key: "source_application_code", label: "Source application", type: "string", editable: false, required: true, lookupDependency: "metrics_core.lkp_source_application", description: "Application that supplied the source value." },
      { key: "source_code", label: "Source code", type: "string", editable: false, required: true, description: "Immutable source-system segment code." },
      { key: "source_value", label: "Source value", type: "string", editable: false, required: false, description: "Source-system display value." },
      { key: "standard_code", label: "Standard segment", type: "string", editable: true, required: true, lookupDependency: "metrics_core.lkp_segment", description: "Governed segment code." },
      { key: "is_active", label: "Active", type: "boolean", editable: true, required: true, description: "Whether this mapping is active." },
      { key: "updated_at", label: "Updated", type: "timestamp", editable: false, required: true, description: "Warehouse concurrency value." },
    ],
    permissions: {
      read: ["data_library.mapping_tables.view"],
      edit: ["data_library.mapping_tables.edit"],
      review: ["data_library.mapping_tables.review"],
      publish: ["data_library.mapping_tables.publish"],
    },
    currentValueOwner: "bigquery-dataform",
    publication: "deferred",
  },
] as const satisfies readonly DataLibraryTableDefinition[]

export function getDataLibraryTableDefinition(key: string): DataLibraryTableDefinition | undefined {
  return dataLibraryTableRegistry.find((definition) => definition.key === key)
}

export function listDataLibraryTableDefinitions(category?: DataLibraryTableCategory): DataLibraryTableDefinition[] {
  return dataLibraryTableRegistry.filter((definition) => !category || definition.category === category)
}
