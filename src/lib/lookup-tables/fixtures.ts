import type { LookupTableMetadata, LookupTableRow } from "./types"

export const lookupTableMetadata: LookupTableMetadata[] = [
  {
    key: "channel_mapping",
    displayName: "Channel Mapping",
    description:
      "Normalizes raw booking channel codes into REVREBEL channel groups.",
    approximateRowCount: 184,
    lastUpdated: "2026-05-17T18:34:00.000Z",
    lastRefreshed: "2026-05-18T08:15:00.000Z",
    status: "ready",
  },
  {
    key: "segment_mapping",
    displayName: "Segment Mapping",
    description:
      "Maps PMS and CRS segment labels into analytics-ready segment groups.",
    approximateRowCount: 96,
    lastUpdated: "2026-05-16T22:11:00.000Z",
    lastRefreshed: "2026-05-18T08:15:00.000Z",
    status: "ready",
  },
  {
    key: "rate_code_mapping",
    displayName: "Rate Code Mapping",
    description:
      "Connects raw rate codes to commercial strategy and pricing categories.",
    approximateRowCount: 421,
    lastUpdated: "2026-05-14T15:09:00.000Z",
    lastRefreshed: "2026-05-18T08:15:00.000Z",
    status: "needs_review",
  },
  {
    key: "source_code_mapping",
    displayName: "Source Code Mapping",
    description:
      "Groups source codes from connected hotel systems for acquisition reporting.",
    approximateRowCount: 137,
    lastUpdated: "2026-05-13T20:45:00.000Z",
    lastRefreshed: "2026-05-18T08:15:00.000Z",
    status: "ready",
  },
  {
    key: "room_type_mapping",
    displayName: "Room Type Mapping",
    description:
      "Standardizes property-specific room type codes into comparable categories.",
    approximateRowCount: 78,
    lastUpdated: "2026-05-12T12:26:00.000Z",
    lastRefreshed: "2026-05-18T08:15:00.000Z",
    status: "draft",
  },
  {
    key: "property_mapping",
    displayName: "Property Mapping",
    description:
      "Maintains property identifiers and display labels used across Metrics.",
    approximateRowCount: 24,
    lastUpdated: "2026-05-10T16:02:00.000Z",
    lastRefreshed: "2026-05-18T08:15:00.000Z",
    status: "ready",
  },
]

const baseRows: LookupTableRow[] = [
  {
    id: "chn-001",
    sourceSystem: "PMS",
    rawCode: "DIR",
    rawName: "Direct Booking",
    mappedValue: "Direct",
    mappedGroup: "Owned",
    isActive: true,
    notes: "Primary direct channel.",
    updatedAt: "2026-05-17T18:34:00.000Z",
    updatedBy: "Gary Stringham",
  },
  {
    id: "chn-002",
    sourceSystem: "CRS",
    rawCode: "OTA-BK",
    rawName: "Booking.com",
    mappedValue: "OTA",
    mappedGroup: "Third Party",
    isActive: true,
    notes: "",
    updatedAt: "2026-05-17T17:18:00.000Z",
    updatedBy: "Gary Stringham",
  },
  {
    id: "chn-003",
    sourceSystem: "CRS",
    rawCode: "OTA-EX",
    rawName: "Expedia",
    mappedValue: "OTA",
    mappedGroup: "Third Party",
    isActive: true,
    notes: "",
    updatedAt: "2026-05-16T20:01:00.000Z",
    updatedBy: "Revenue Ops",
  },
  {
    id: "chn-004",
    sourceSystem: "PMS",
    rawCode: "CORP",
    rawName: "Corporate",
    mappedValue: "Corporate",
    mappedGroup: "Negotiated",
    isActive: true,
    notes: "Review with sales ops before changing group.",
    updatedAt: "2026-05-15T19:45:00.000Z",
    updatedBy: "Revenue Ops",
  },
  {
    id: "chn-005",
    sourceSystem: "PMS",
    rawCode: "WALK",
    rawName: "Walk In",
    mappedValue: "Direct",
    mappedGroup: "Property",
    isActive: true,
    notes: "",
    updatedAt: "2026-05-14T22:20:00.000Z",
    updatedBy: "Gary Stringham",
  },
  {
    id: "chn-006",
    sourceSystem: "Legacy PMS",
    rawCode: "UNK",
    rawName: "Unknown Source",
    mappedValue: "",
    mappedGroup: "",
    isActive: false,
    notes: "Inactive until source ownership is confirmed.",
    updatedAt: "2026-05-12T13:11:00.000Z",
    updatedBy: "System",
  },
]

export const lookupTableRowsByKey: Record<string, LookupTableRow[]> = {
  channel_mapping: baseRows,
  segment_mapping: baseRows.map((row, index) => ({
    ...row,
    id: `seg-${String(index + 1).padStart(3, "0")}`,
    rawCode: ["BAR", "DISC", "GOV", "LNR", "GRP", "COMP"][index] ?? row.rawCode,
    rawName:
      [
        "Best Available",
        "Discount",
        "Government",
        "Local Negotiated",
        "Group",
        "Comp",
      ][index] ?? row.rawName,
    mappedValue:
      [
        "Transient",
        "Discount",
        "Government",
        "Corporate",
        "Group",
        "House Use",
      ][index] ?? row.mappedValue,
    mappedGroup: [
      "Retail",
      "Retail",
      "Qualified",
      "Negotiated",
      "Group",
      "Internal",
    ][index],
  })),
  rate_code_mapping: baseRows.map((row, index) => ({
    ...row,
    id: `rate-${String(index + 1).padStart(3, "0")}`,
    rawCode:
      ["RACK", "ADV14", "PKG", "AAA", "CORP1", "OLD"][index] ?? row.rawCode,
    rawName:
      [
        "Rack Rate",
        "Advance Purchase 14",
        "Package Rate",
        "AAA Rate",
        "Corporate 1",
        "Old Promo",
      ][index] ?? row.rawName,
    mappedValue:
      ["Retail", "Advance", "Package", "Qualified", "Corporate", ""][index] ??
      "",
    mappedGroup: ["Public", "Public", "Bundled", "Discount", "Negotiated", ""][
      index
    ],
  })),
  source_code_mapping: baseRows,
  room_type_mapping: baseRows.slice(0, 4).map((row, index) => ({
    ...row,
    id: `room-${String(index + 1).padStart(3, "0")}`,
    rawCode: ["KNG", "QQ", "STE", "ADA"][index] ?? row.rawCode,
    rawName:
      ["King Room", "Two Queens", "Suite", "Accessible King"][index] ??
      row.rawName,
    mappedValue:
      ["King", "Double Queen", "Suite", "Accessible"][index] ?? row.mappedValue,
    mappedGroup: ["Standard", "Standard", "Premium", "Standard"][index],
  })),
  property_mapping: baseRows.slice(0, 3).map((row, index) => ({
    ...row,
    id: `prop-${String(index + 1).padStart(3, "0")}`,
    rawCode: ["RR-AUS", "RR-DEN", "RR-SFO"][index] ?? row.rawCode,
    rawName:
      ["Austin Downtown", "Denver Central", "San Francisco Bay"][index] ??
      row.rawName,
    mappedValue:
      ["Austin Downtown", "Denver Central", "San Francisco Bay"][index] ??
      row.mappedValue,
    mappedGroup: ["Urban", "Urban", "Urban"][index],
  })),
}
