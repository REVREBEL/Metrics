export type MappingCoverageStatus = "ready" | "partial" | "needs_review"

export type MappingRowStatus = "mapped" | "partial" | "unmapped" | "inactive"

export type MappingTableMetadata = {
  key: string
  displayName: string
  description: string
  sourceTableName: string
  standardTableName: string
  category: string
  approximateRowCount: number
  mappedRowCount: number
  partialRowCount: number
  unmappedRowCount: number
  lastUpdated: string
  lastRefreshed: string
  status: MappingCoverageStatus
  requiredPermission: string
}

export type MappingTableRow = {
  id: string
  sourceSystem: string
  sourceCode: string
  sourceValue: string
  standardCode: string
  standardValue: string
  standardGroup?: string
  confidence: number
  status: MappingRowStatus
  reviewReason?: string
  updatedAt: string
  updatedBy: string
}
