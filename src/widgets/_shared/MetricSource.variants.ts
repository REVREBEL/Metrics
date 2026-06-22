import { cva, type VariantProps } from "class-variance-authority";

export const metricSourceVariants = cva("metric-source", {
  variants: {
    sourceKey: {
      "indicator-positive": "metric-source--indicator-positive",
      "indicator-negative": "metric-source--indicator-negative",
      "indicator-total": "metric-source--indicator-total",

      "segment-total": "metric-source--segment-total",
      "segment-transient": "metric-source--segment-transient",
      "segment-group": "metric-source--segment-group",
      "segment-crew": "metric-source--segment-crew",
      "segment-complimentary": "metric-source--segment-complimentary",
      "segment-other": "metric-source--segment-other",

      "channel-expedia": "metric-source--channel-expedia",
      "channel-booking": "metric-source--channel-booking",
      "channel-agoda": "metric-source--channel-agoda",
      "channel-hopper": "metric-source--channel-hopper",
      "channel-hoteltonight": "metric-source--channel-hoteltonight",
      "channel-hotelbeds": "metric-source--channel-hotelbeds",
      "channel-priceline": "metric-source--channel-priceline",
      "channel-airbnb": "metric-source--channel-airbnb",
      "channel-hotwire": "metric-source--channel-hotwire",

      "social-facebook": "metric-source--social-facebook",
      "social-instagram": "metric-source--social-instagram",
      "social-x": "metric-source--social-x",
      "social-linkedin": "metric-source--social-linkedin",
      "social-tiktok": "metric-source--social-tiktok",
      "social-blog": "metric-source--social-blog",
      "social-telegram": "metric-source--social-telegram",
      "social-slack": "metric-source--social-slack",
      "social-youtube": "metric-source--social-youtube",
      "social-pinterest": "metric-source--social-pinterest",
      "social-github": "metric-source--social-github",

      "review-yelp": "metric-source--review-yelp",
      "review-tripadvisor": "metric-source--review-tripadvisor",
      "review-expedia": "metric-source--review-expedia",
      "review-booking": "metric-source--review-booking",

      "room-type-room-type-1": "metric-source--room-type-room-type-1",
      "room-type-room-type-2": "metric-source--room-type-room-type-2",
      "room-type-room-type-3": "metric-source--room-type-room-type-3",
      "room-type-room-type-4": "metric-source--room-type-room-type-4",

      "room-category-room": "metric-source--room-category-room",
      "room-category-suite": "metric-source--room-category-suite",
      "room-category-studio": "metric-source--room-category-studio",
      "room-category-villa": "metric-source--room-category-villa",
      "room-category-residence": "metric-source--room-category-residence",
      "room-category-accessible": "metric-source--room-category-accessible",
      "room-category-other": "metric-source--room-category-other",

      "room-class-standard": "metric-source--room-class-standard",
      "room-class-deluxe": "metric-source--room-class-deluxe",
      "room-class-premium": "metric-source--room-class-premium",
      "room-class-executive": "metric-source--room-class-executive",
      "room-class-best": "metric-source--room-class-best",
      "room-class-upgrade": "metric-source--room-class-upgrade",
      "room-class-other": "metric-source--room-class-other",

      "room-feature-none": "metric-source--room-feature-none",
      "room-feature-view": "metric-source--room-feature-view",
      "room-feature-balcony": "metric-source--room-feature-balcony",
      "room-feature-corner": "metric-source--room-feature-corner",
      "room-feature-high-floor": "metric-source--room-feature-high-floor",
      "room-feature-low-floor": "metric-source--room-feature-low-floor",
      "room-feature-accessible": "metric-source--room-feature-accessible",
      "room-feature-other": "metric-source--room-feature-other",

      "bed-type-king": "metric-source--bed-type-king",
      "bed-type-queen": "metric-source--bed-type-queen",
      "bed-type-double": "metric-source--bed-type-double",
      "bed-type-twin": "metric-source--bed-type-twin",
      "bed-type-multiple": "metric-source--bed-type-multiple",
      "bed-type-other": "metric-source--bed-type-other",
    },
  },
});

export type MetricSourceVariantProps = VariantProps<typeof metricSourceVariants>;
export type MetricSourceKey = NonNullable<MetricSourceVariantProps["sourceKey"]>;
