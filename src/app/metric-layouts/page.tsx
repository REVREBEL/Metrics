import {
  MetricCard,
  MetricLayout,
  MetricLayoutGroup,
} from "@/widgets/_shared/MetricCard";

const metricProps = [
  {
    name: "metricType",
    values: "base | occupancy | rooms | adr | revenue | nights | reservations | guests",
  },
  {
    name: "abbreviated",
    values: "true | false",
  },
  {
    name: "trend",
    values: "up | down | neutral",
  },
  {
    name: "showTrendIcon",
    values: "handled by icon/change composition",
  },
  {
    name: "varianceLabel",
    values: "to-book | %chg | var | yoy | wow | mom | stly | st2y",
  },
  {
    name: "showVariance",
    values: "render change/sublabel or omit them",
  },
  {
    name: "size",
    values: "xs | sm | md | lg | xl",
  },
  {
    name: "variant",
    values: "stack | inline | split | row | hero | compact | tile",
  },
];

const usage = `import { MetricLayout } from "@/widgets/_shared/MetricCard";

<MetricLayout
  label="ADR"
  value="$362.47"
  change="0.0%"
  changeLabel="STLY"
  trend="up"
  metric="transient"
  variant="inline"
  size="md"
/>`;

function TrendDot({ trend = "up" }: { trend?: "up" | "down" }) {
  return (
    <span
      className={`inline-flex size-5 items-center justify-center rounded-full ${
        trend === "up" ? "bg-(--color-light-blue) text-(--color-yellow)" : "bg-(--color-negative) text-(--background)"
      }`}
      aria-hidden="true"
    >
      {trend === "up" ? "↑" : "↓"}
    </span>
  );
}

export default function MetricLayoutsPage() {
  return (
    <main className="metric-layout-showcase">
      <div className="metric-layout-showcase__inner">
        <section className="metric-layout-showcase__hero">
          <div className="metric-layout-showcase__eyebrow">Shared Component</div>
          <h1 className="metric-layout-showcase__title">Metric Layouts</h1>
          <p className="metric-layout-showcase__copy">
            A flexible metric primitive inspired by the Webflow layout system. Use it inside any
            card, table cell, header, chart summary, dashboard strip, or standalone widget when you
            need consistent metric typography without forcing a full card wrapper.
          </p>
        </section>

        <MetricCard
          title="Metric Type | Variants"
          description="Core display variants for one metric value, variance value, and trend icon."
          metric="total"
        >
          <div className="metric-layout-showcase__variant-grid">
            <div className="metric-layout-showcase__variant">
              <h3 className="metric-layout-showcase__example-title">Stacked-1-Col</h3>
              <MetricLayout
                label="Metric"
                value="0.0%"
                change="0.0%"
                changeLabel="STLY"
                trend="up"
                metric="transient"
                variant="stack"
                size="md"
                suffix={<TrendDot />}
              />
            </div>

            <div className="metric-layout-showcase__variant">
              <h3 className="metric-layout-showcase__example-title">Horizontal-1-Row</h3>
              <MetricLayout
                label="Metric"
                value="0.0%"
                change="0.0%"
                changeLabel="STLY"
                trend="neutral"
                metric="transient"
                variant="row"
                size="sm"
                suffix={<TrendDot />}
              />
            </div>

            <div className="metric-layout-showcase__variant">
              <h3 className="metric-layout-showcase__example-title">Stacked-2-Col</h3>
              <MetricLayout
                label="Metric"
                value="0.0%"
                change="0.0%"
                changeLabel="STLY"
                trend="up"
                metric="transient"
                variant="split"
                size="md"
                suffix={<TrendDot />}
              />
            </div>

            <div className="metric-layout-showcase__variant">
              <h3 className="metric-layout-showcase__example-title">Horizontal-2-Row</h3>
              <MetricLayout
                label="Metric"
                value="0.0%"
                change="0.0%"
                changeLabel="STLY"
                trend="up"
                metric="transient"
                variant="inline"
                size="md"
                suffix={<TrendDot />}
              />
            </div>
          </div>
        </MetricCard>

        <section className="metric-layout-showcase__panel">
          <h2 className="metric-layout-showcase__heading">Props</h2>
          <p className="metric-layout-showcase__copy">
            The primitive is intentionally flexible. For a builder-friendly wrapper, map dashboard
            metric types into label/value formatting, then pass the formatted result into
            MetricLayout.
          </p>
          <div className="mt-6">
            {metricProps.map((prop) => (
              <div key={prop.name} className="metric-layout-showcase__prop-row">
                <div className="metric-layout-showcase__prop-name">{prop.name}:</div>
                <div className="metric-layout-showcase__prop-values">| {prop.values} |</div>
              </div>
            ))}
          </div>
        </section>

        <MetricCard
          title="Size"
          description="The size property scales label, value, variance, and icon sizing together."
          metric="transient"
        >
          <div className="metric-layout-showcase__size-grid">
            {[
              ["XS", "xs", "Metric", "0.0%"],
              ["SM", "sm", "ADR", "0.0%"],
              ["BASE", "md", "Metric", "0.0%"],
              ["MD", "md", "Metric", "0.0%"],
              ["LG", "lg", "Metric", "0.0%"],
              ["XL", "xl", "Metric", "0.0%"],
            ].map(([title, size, label, value]) => (
              <div key={title}>
                <h3 className="metric-layout-showcase__example-title">{title}</h3>
                <MetricLayout
                  label={label}
                  value={value}
                  change="0.0%"
                  changeLabel="STLY"
                  trend="up"
                  metric="transient"
                  variant="inline"
                  size={size as "xs" | "sm" | "md" | "lg" | "xl"}
                  suffix={<TrendDot />}
                />
              </div>
            ))}
          </div>
        </MetricCard>

        <section className="metric-layout-showcase__panel">
          <div className="metric-layout-showcase__layout-row">
            <h3 className="metric-layout-showcase__example-title">Layout | Stacked 1Col</h3>
            <MetricLayoutGroup columns={3}>
              <MetricLayout label="Metric" value="0.0%" change="0.0%" changeLabel="STLY" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="ADR" value="$0.00" change="0.0%" changeLabel="STLY" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="REV" value="$0,000" change="0.0%" changeLabel="STLY" trend="up" suffix={<TrendDot />} />
            </MetricLayoutGroup>
          </div>

          <div className="metric-layout-showcase__layout-row metric-layout-showcase__layout-row--blue">
            <h3 className="metric-layout-showcase__example-title">Layout | Stacked 1Col, No Var</h3>
            <MetricLayoutGroup columns={3}>
              <MetricLayout label="Metric" value="0.0%" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="ADR" value="$0.00" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="REV" value="$0,000" trend="up" suffix={<TrendDot />} />
            </MetricLayoutGroup>
          </div>

          <div className="metric-layout-showcase__layout-row metric-layout-showcase__layout-row--blue">
            <h3 className="metric-layout-showcase__example-title">Layout | Horizontal 2Row</h3>
            <MetricLayoutGroup columns={3}>
              <MetricLayout label="Metric" value="0.0%" change="0.0%" changeLabel="STLY" variant="row" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="ADR" value="$0.00" change="0.0%" changeLabel="STLY" variant="row" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="REV" value="$0,000" change="0.0%" changeLabel="STLY" variant="row" trend="up" suffix={<TrendDot />} />
            </MetricLayoutGroup>
          </div>

          <div className="metric-layout-showcase__layout-row metric-layout-showcase__layout-row--blue">
            <h3 className="metric-layout-showcase__example-title">Layout | Horizontal 1Row, No Var</h3>
            <div className="metric-layout-showcase__layout-content metric-layout-showcase__layout-content--vertical">
              <MetricLayout label="Metric" value="0.0%" variant="row" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="ADR" value="$0.00" variant="row" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="REV" value="$0,000" variant="row" trend="up" suffix={<TrendDot />} />
            </div>
          </div>

          <div className="metric-layout-showcase__layout-row metric-layout-showcase__layout-row--blue">
            <h3 className="metric-layout-showcase__example-title">Layout | Stacked 2Col</h3>
            <div className="metric-layout-showcase__layout-content metric-layout-showcase__layout-content--vertical">
              <MetricLayout label="Metric" value="0.0%" change="0.0%" changeLabel="STLY" variant="split" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="ADR" value="$0.00" change="0.0%" changeLabel="STLY" variant="split" trend="up" suffix={<TrendDot />} />
              <MetricLayout label="REV" value="$0,000" change="0.0%" changeLabel="STLY" variant="split" trend="up" suffix={<TrendDot />} />
            </div>
          </div>
        </section>

        <section className="metric-layout-showcase__code-panel">
          <div className="metric-layout-showcase__code-header">
            <h2 className="metric-layout-showcase__heading mb-0">Usage</h2>
            <span className="metric-layout-showcase__code-label">TSX</span>
          </div>
          <pre className="metric-layout-showcase__code"><code>{usage}</code></pre>
        </section>
      </div>
    </main>
  );
}
