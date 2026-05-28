"use client";

import { ArrowRight } from "lucide-react";

import { MetricCard, MetricLayout, MetricLayoutGroup } from "@/widgets/_shared/MetricCard";
import type { StandardMetricWidgetProps } from "@/widgets/props";

export type PageTrafficRow = {
  page: string;
  source: string;
  views: number;
  visitors: number;
  share: number;
};

export type PageTrafficCardProps = StandardMetricWidgetProps & {
  text1?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  rows?: PageTrafficRow[];
};

const defaultRows: PageTrafficRow[] = [
  { page: "/rooms", source: "Organic Search", views: 18420, visitors: 12950, share: 100 },
  { page: "/offers", source: "Paid Search", views: 14280, visitors: 9630, share: 78 },
  { page: "/dining", source: "Direct", views: 10860, visitors: 7440, share: 59 },
  { page: "/events", source: "Referral", views: 8240, visitors: 5210, share: 45 },
];

function formatCompact(value: number) {
  return value.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
}

export default function PageTrafficCard({
  title = "Page Traffic",
  description = "Top content paths by page views, visitors, and relative traffic share.",
  metric = "total",
  className,
  contentClassName,
  headerAction,
  rows = defaultRows,
}: PageTrafficCardProps) {
  const totalViews = rows.reduce((sum, row) => sum + row.views, 0);
  const totalVisitors = rows.reduce((sum, row) => sum + row.visitors, 0);
  const topShare = Math.max(...rows.map((row) => row.share), 0);

  return (
    <MetricCard
      title={title}
      description={description}
      metric={metric}
      className={className}
      contentClassName={contentClassName}
      headerAction={headerAction}
    >
      <div className="page-traffic-card">
        <MetricLayoutGroup columns={3} className="page-traffic-card__summary">
          <MetricLayout
            label="Views"
            value={formatCompact(totalViews)}
            change="12.4%"
            changeLabel="WOW"
            trend="up"
            metric={metric}
            variant="stack"
            size="md"
          />
          <MetricLayout
            label="Visitors"
            value={formatCompact(totalVisitors)}
            change="8.1%"
            changeLabel="WOW"
            trend="up"
            metric="transient"
            variant="stack"
            size="md"
          />
          <MetricLayout
            label="Top Share"
            value={`${topShare}%`}
            change="2.0%"
            changeLabel="STLY"
            trend="up"
            metric="group"
            variant="stack"
            size="md"
          />
        </MetricLayoutGroup>

        <div className="page-traffic-card__table-wrap">
          <table className="page-traffic-card__table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Source</th>
                <th>Views</th>
                <th>Visitors</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.page}>
                  <td>
                    <div className="page-traffic-card__page">
                      <span className="page-traffic-card__rank">{index + 1}</span>
                      <span className="page-traffic-card__path">{row.page}</span>
                    </div>
                  </td>
                  <td className="page-traffic-card__source">{row.source}</td>
                  <td className="page-traffic-card__number">{row.views.toLocaleString()}</td>
                  <td className="page-traffic-card__number">{row.visitors.toLocaleString()}</td>
                  <td>
                    <div className="page-traffic-card__bar-track">
                      <div
                        className="page-traffic-card__bar-fill"
                        style={{ "--page-traffic-share": `${row.share}%` } as React.CSSProperties}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="page-traffic-card__footer">
          <p className="page-traffic-card__footer-copy">
            Page traffic is designed as a content card shell that can sit next to campaign,
            analytics, or website performance widgets.
          </p>
          <button className="page-traffic-card__cta" type="button">
            View Pages
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </MetricCard>
  );
}
