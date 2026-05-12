"use client";

import { useMemo, useState } from "react";
import { MoreVertical } from "lucide-react";

import ExpediaIcon from "@/assets/ChannelIconsReact/Expedia";
import BookingIcon from "@/assets/ChannelIconsReact/Booking";
import AgodaIcon from "@/assets/ChannelIconsReact/Agoda";
import PricelineIcon from "@/assets/ChannelIconsReact/Priceline";
import HotelbedsIcon from "@/assets/ChannelIconsReact/Hotelbeds";
import HopperIcon from "@/assets/ChannelIconsReact/Hopper";
import {
  MetricCard,
  MetricCardTabs,
} from "@/widgets/_shared/MetricCard";

type ChannelMetric = "rooms" | "adr" | "revenue" | "alos";
type ChannelKey = "expedia" | "booking" | "agoda" | "priceline" | "hotelbeds" | "hopper";

type ChannelDatum = {
  key: ChannelKey;
  name: string;
  rooms: number;
  adr: number;
  revenue: number;
  alos: number;
  retailAdr: number;
  transientAlos: number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ChannelDisplayDatum = ChannelDatum & {
  value: number;
  width: number;
  barLabel: string;
  sideLabel: string;
  sideValue: number;
};

const CHANNEL_TABS = [
  { label: "Rooms", value: "rooms" },
  { label: "ADR", value: "adr" },
  { label: "Revenue", value: "revenue" },
  { label: "ALOS", value: "alos" },
] satisfies Array<{ label: string; value: ChannelMetric }>;

const CHANNEL_DATA = [
  {
    key: "expedia",
    name: "Expedia",
    rooms: 412,
    adr: 214.75,
    revenue: 88477,
    alos: 2.4,
    retailAdr: 229.5,
    transientAlos: 2.1,
    Icon: ExpediaIcon,
  },
  {
    key: "booking",
    name: "Booking",
    rooms: 368,
    adr: 226.1,
    revenue: 83205,
    alos: 2.1,
    retailAdr: 229.5,
    transientAlos: 2.1,
    Icon: BookingIcon,
  },
  {
    key: "agoda",
    name: "Agoda",
    rooms: 214,
    adr: 189.25,
    revenue: 40500,
    alos: 2.8,
    retailAdr: 229.5,
    transientAlos: 2.1,
    Icon: AgodaIcon,
  },
  {
    key: "priceline",
    name: "Priceline",
    rooms: 176,
    adr: 198.35,
    revenue: 34910,
    alos: 1.9,
    retailAdr: 229.5,
    transientAlos: 2.1,
    Icon: PricelineIcon,
  },
  {
    key: "hotelbeds",
    name: "Hotelbeds",
    rooms: 142,
    adr: 171.8,
    revenue: 24396,
    alos: 3.2,
    retailAdr: 229.5,
    transientAlos: 2.1,
    Icon: HotelbedsIcon,
  },
  {
    key: "hopper",
    name: "Hopper",
    rooms: 96,
    adr: 203.6,
    revenue: 19546,
    alos: 1.7,
    retailAdr: 229.5,
    transientAlos: 2.1,
    Icon: HopperIcon,
  },
] satisfies ChannelDatum[];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);

const formatCurrency = (value: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(value);

const formatSignedCurrency = (value: number) => {
  const prefix = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${prefix}${formatCurrency(Math.abs(value), 0)}`;
};

const formatSignedDecimal = (value: number) => {
  const prefix = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${prefix}${Math.abs(value).toFixed(1)}`;
};

function getMetricValue(item: ChannelDatum, metric: ChannelMetric) {
  switch (metric) {
    case "rooms":
      return item.rooms;
    case "adr":
      return item.adr;
    case "revenue":
      return item.revenue;
    case "alos":
      return item.alos;
  }
}

function getBarLabel(item: ChannelDatum, metric: ChannelMetric) {
  switch (metric) {
    case "rooms":
      return formatNumber(item.rooms);
    case "adr":
      return formatCurrency(item.adr, 0);
    case "revenue":
      return formatCurrency(item.revenue, 0);
    case "alos":
      return item.alos.toFixed(1);
  }
}

function getSideMetric(item: ChannelDatum, metric: ChannelMetric, totals: { rooms: number; revenue: number }) {
  switch (metric) {
    case "rooms": {
      const value = totals.rooms ? (item.rooms / totals.rooms) * 100 : 0;
      return {
        value,
        label: `${value.toFixed(1)}%`,
      };
    }
    case "adr": {
      const value = item.adr - item.retailAdr;
      return {
        value,
        label: formatSignedCurrency(value),
      };
    }
    case "revenue": {
      const value = totals.revenue ? (item.revenue / totals.revenue) * 100 : 0;
      return {
        value,
        label: `${value.toFixed(1)}%`,
      };
    }
    case "alos": {
      const value = item.alos - item.transientAlos;
      return {
        value,
        label: formatSignedDecimal(value),
      };
    }
  }
}

export default function TopChannelsChart() {
  const [activeMetric, setActiveMetric] = useState<ChannelMetric>("rooms");
  const [hoveredKey, setHoveredKey] = useState<ChannelKey | null>(null);

  const totals = useMemo(
    () => ({
      rooms: CHANNEL_DATA.reduce((sum, item) => sum + item.rooms, 0),
      revenue: CHANNEL_DATA.reduce((sum, item) => sum + item.revenue, 0),
    }),
    []
  );

  const displayData = useMemo<ChannelDisplayDatum[]>(() => {
    const maxValue = Math.max(...CHANNEL_DATA.map((item) => getMetricValue(item, activeMetric)));

    return CHANNEL_DATA.map((item) => {
      const value = getMetricValue(item, activeMetric);
      const sideMetric = getSideMetric(item, activeMetric, totals);

      return {
        ...item,
        value,
        width: maxValue ? Math.max((value / maxValue) * 100, 4) : 0,
        barLabel: getBarLabel(item, activeMetric),
        sideLabel: sideMetric.label,
        sideValue: sideMetric.value,
      };
    });
  }, [activeMetric, totals]);

  return (
    <MetricCard
      title="Top Channels"
      description="OTA production ranked by rooms, ADR, revenue, and length of stay."
      metric="total"
      headerAction={<MoreVertical className="h-5 w-5 cursor-pointer text-primary" />}
    >
      <MetricCardTabs
        tabs={CHANNEL_TABS}
        value={activeMetric}
        onValueChange={setActiveMetric}
      />

      <div className="top-channels-chart">
        <div className="top-channels-chart__bars" aria-label="Top OTA channel bars">
          {displayData.map((channel, index) => {
            const isMuted = hoveredKey !== null && hoveredKey !== channel.key;
            const labelInside = channel.width >= 24;

            return (
              <div
                key={channel.key}
                className="top-channels-chart__row"
                data-channel={channel.key}
                data-muted={isMuted ? "true" : undefined}
                onMouseEnter={() => setHoveredKey(channel.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <span className="top-channels-chart__rank">{index + 1}</span>

                <div className="top-channels-chart__bar-track">
                  <div
                    className="top-channels-chart__bar"
                    style={{ width: `${channel.width}%` }}
                  >
                    <span className="top-channels-chart__bar-name">{channel.name}</span>
                    {labelInside && (
                      <span className="top-channels-chart__bar-value top-channels-chart__bar-value--inside">
                        {channel.barLabel}
                      </span>
                    )}
                  </div>
                  {!labelInside && (
                    <span
                      className="top-channels-chart__bar-value top-channels-chart__bar-value--outside"
                      style={{ left: `calc(${channel.width}% + 0.5rem)` }}
                    >
                      {channel.barLabel}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="top-channels-chart__metrics" aria-label="Channel comparison metrics">
          {displayData.map((channel) => {
            const Icon = channel.Icon;
            const isMuted = hoveredKey !== null && hoveredKey !== channel.key;

            return (
              <div
                key={channel.key}
                className="top-channels-chart__metric"
                data-channel={channel.key}
                data-muted={isMuted ? "true" : undefined}
                onMouseEnter={() => setHoveredKey(channel.key)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <Icon className="top-channels-chart__icon" aria-hidden="true" />
                <div>
                  <div className="top-channels-chart__metric-value">{channel.sideLabel}</div>
                  <div className="top-channels-chart__metric-label">
                    {activeMetric === "rooms" && "% of total rooms"}
                    {activeMetric === "adr" && "vs retail ADR"}
                    {activeMetric === "revenue" && "% of total revenue"}
                    {activeMetric === "alos" && "vs transient ALOS"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MetricCard>
  );
}
