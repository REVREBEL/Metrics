import { metricSourceVariants, type MetricSourceKey } from "./MetricSource.variants";

export type MetricSourceType =
  | "indicator"
  | "segment"
  | "channel"
  | "social"
  | "review"
  | "room-type"
  | "room-category"
  | "room-class"
  | "room-feature"
  | "bed-type";

export type IndicatorSource = "positive" | "negative" | "total";

export type SegmentSource =
  | "total"
  | "transient"
  | "group"
  | "crew"
  | "complimentary"
  | "other";

export type ChannelSource =
  | "expedia"
  | "booking"
  | "agoda"
  | "hopper"
  | "hoteltonight"
  | "hotelbeds"
  | "priceline"
  | "airbnb"
  | "hotwire";

export type SocialSource =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "tiktok"
  | "blog"
  | "telegram"
  | "slack"
  | "youtube"
  | "pinterest"
  | "github";

export type ReviewSource = "yelp" | "tripadvisor" | "expedia" | "booking";

/**
 * Room type is intentionally generic because property-level room type names are not globally standardized.
 * Lookup-table logic should assign room-type-1 through room-type-4 consistently per property or selected result set.
 */
export type RoomTypeSource = "room-type-1" | "room-type-2" | "room-type-3" | "room-type-4";

export type RoomCategorySource =
  | "room"
  | "suite"
  | "studio"
  | "villa"
  | "residence"
  | "accessible"
  | "other";

export type RoomClassSource =
  | "standard"
  | "deluxe"
  | "premium"
  | "executive"
  | "best"
  | "upgrade"
  | "other";

export type RoomFeatureSource =
  | "none"
  | "view"
  | "balcony"
  | "corner"
  | "high-floor"
  | "low-floor"
  | "accessible"
  | "other";

export type BedTypeSource = "king" | "queen" | "double" | "twin" | "multiple" | "other";

export type MetricSourceByType = {
  indicator: IndicatorSource;
  segment: SegmentSource;
  channel: ChannelSource;
  social: SocialSource;
  review: ReviewSource;
  "room-type": RoomTypeSource;
  "room-category": RoomCategorySource;
  "room-class": RoomClassSource;
  "room-feature": RoomFeatureSource;
  "bed-type": BedTypeSource;
};

export type MetricSource = MetricSourceByType[MetricSourceType];

export type MetricSourceProps<TSourceType extends MetricSourceType = MetricSourceType> = {
  sourceType?: TSourceType;
  source?: MetricSourceByType[TSourceType];
};

export function toMetricSourceKey(
  sourceType?: MetricSourceType,
  source?: MetricSource
): MetricSourceKey | undefined {
  if (!sourceType || !source) return undefined;
  return `${sourceType}-${source}` as MetricSourceKey;
}

export function getMetricSourceClass(sourceType?: MetricSourceType, source?: MetricSource) {
  const sourceKey = toMetricSourceKey(sourceType, source);
  if (!sourceKey) return undefined;
  return metricSourceVariants({ sourceKey });
}

export function getMetricSourceDataAttributes(sourceType?: MetricSourceType, source?: MetricSource) {
  if (!sourceType || !source) return {};

  return {
    "data-source-type": sourceType,
    "data-source": source,
  };
}

export function getSourceTypeForLegacyMetric(metric?: string): MetricSourceType | undefined {
  if (!metric) return undefined;
  if (["positive", "negative"].includes(metric)) return "indicator";
  if (["total", "transient", "group", "crew", "complimentary", "other"].includes(metric)) return "segment";
  if (["facebook", "instagram", "x", "linkedin", "tiktok", "blog", "telegram", "slack", "youtube", "pinterest", "github"].includes(metric)) return "social";
  if (["yelp", "tripadvisor"].includes(metric)) return "review";
  return undefined;
}

export const roomTypeSourceOrder: RoomTypeSource[] = [
  "room-type-1",
  "room-type-2",
  "room-type-3",
  "room-type-4",
];

export type RoomTypeLookupInput = {
  roomTypeCode?: string | null;
  roomTypeName?: string | null;
  rooms?: number | null;
  revenue?: number | null;
  sortValue?: number | null;
};

function getRoomTypeLookupKey(roomType: RoomTypeLookupInput) {
  return (roomType.roomTypeCode ?? roomType.roomTypeName ?? "").trim().toLowerCase();
}

function getRoomTypeSortValue(roomType: RoomTypeLookupInput) {
  return roomType.sortValue ?? roomType.revenue ?? roomType.rooms ?? 0;
}

/**
 * Assigns property-specific room types into four stable visual buckets.
 * Lookup tables should own granular names/codes; UI components should consume the generic room-type-* source.
 */
export function buildRoomTypeSourceMap(roomTypes: RoomTypeLookupInput[]) {
  const rankedRoomTypes = [...roomTypes]
    .filter((roomType) => getRoomTypeLookupKey(roomType))
    .sort((a, b) => getRoomTypeSortValue(b) - getRoomTypeSortValue(a));

  return rankedRoomTypes.reduce<Record<string, RoomTypeSource>>((sourceMap, roomType, index) => {
    const source = roomTypeSourceOrder[Math.min(index, roomTypeSourceOrder.length - 1)];
    sourceMap[getRoomTypeLookupKey(roomType)] = source;
    return sourceMap;
  }, {});
}

export function getRoomTypeSource(
  roomType: RoomTypeLookupInput,
  sourceMap: Record<string, RoomTypeSource>
): RoomTypeSource {
  return sourceMap[getRoomTypeLookupKey(roomType)] ?? "room-type-4";
}
