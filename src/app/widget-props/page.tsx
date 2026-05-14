import {
  metricThemeOptions,
  metricWidgetImplementationExample,
  standardMetricWidgetPropDefinitions,
} from "@/widgets/props";
import { MetricCard, MetricCardTabs, MetricInsight } from "@/widgets/_shared/MetricCard";

const exampleTabs = [
  { label: "Budget", value: "budget" },
  { label: "OTB", value: "otb" },
  { label: "STLY", value: "stly" },
];

const usageExamples = [
  {
    title: "Minimal Card",
    description: "The smallest useful widget contract: title, description, metric, and content.",
    code: `<MetricCard
  title="Revenue Snapshot"
  description="Revenue performance against selected comparison period."
  metric="total"
>
  <MetricCardValue>$42.5K</MetricCardValue>
</MetricCard>`,
  },
  {
    title: "Header Action",
    description: "Use headerAction for icons, menus, export buttons, badges, or compact controls.",
    code: `<MetricCard
  title="Budget Breakdown"
  description="Spend distribution across production segments."
  metric="group"
  headerAction={<MoreVertical className="size-5" />}
>
  ...
</MetricCard>`,
  },
  {
    title: "Tabs",
    description: "Use MetricCardTabs so active/inactive tab states stay consistent across all widgets.",
    code: `<MetricCardTabs
  tabs={[
    { label: "Budget", value: "budget" },
    { label: "OTB", value: "otb" },
    { label: "STLY", value: "stly" },
  ]}
  value={activeView}
  onValueChange={setActiveView}
/>`,
  },
  {
    title: "Section Layout",
    description: "For complex widgets, keep layout-specific classes local while still using the shared header contract.",
    code: `<MetricCard
  title={title}
  eyebrow={eyebrow}
  description={description}
  metric={metric}
  className={className}
  contentClassName={contentClassName}
>
  <div className="my-widget__grid">...</div>
</MetricCard>`,
  },
];

export default function WidgetPropsShowcasePage() {
  return (
    <main className="widget-props-page">
      <div className="widget-props-page__inner">
        <section className="widget-props-page__hero metric-card--total">
          <div className="widget-props-page__eyebrow">Widget System</div>
          <h1 className="widget-props-page__title">Metric Props</h1>
          <p className="widget-props-page__subtitle">
            A working reference for the standard props every configurable dashboard widget should support:
            title, eyebrow, description, metric theme, sizing classes, header actions, and tabs.
          </p>
        </section>

        <section className="widget-props-page__grid">
          <div className="widget-props-page__panel">
            <h2 className="widget-props-page__heading">Recommended Contract</h2>
            <p className="widget-props-page__copy">
              Every reusable widget should accept the standard metric-card props, pass them into
              MetricCard, then add only the widget-specific props needed for its data, view mode,
              filters, or event handlers. This keeps the dashboard builder predictable while still
              allowing each widget to have custom internals.
            </p>
          </div>

          <MetricCard
            eyebrow="Example"
            title="Budget Breakdown"
            description="Spend distribution across production segments."
            metric="group"
            headerAction={<span className="metric-card__label">Menu</span>}
          >
            <MetricCardTabs tabs={exampleTabs} defaultValue="otb" />
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div>
                <div className="metric-card__label">Rooms</div>
                <div className="metric-card__value">876</div>
              </div>
              <div>
                <div className="metric-card__label">ADR</div>
                <div className="metric-card__value">$362</div>
              </div>
              <div>
                <div className="metric-card__label">Revenue</div>
                <div className="metric-card__value">$318K</div>
              </div>
            </div>
            <MetricInsight className="mt-6">
              This example uses the shared title, description, metric theme, tabs, value, label,
              and insight styles.
            </MetricInsight>
          </MetricCard>
        </section>

        <section>
          <h2 className="widget-props-page__heading">Standard Props</h2>
          <div className="widget-props-page__prop-grid">
            {standardMetricWidgetPropDefinitions.map((prop) => (
              <article key={prop.name} className="widget-props-page__prop-card">
                <h3 className="widget-props-page__prop-name">{prop.name}</h3>
                <span className="widget-props-page__prop-type">{prop.type}</span>
                {prop.defaultValue ? (
                  <div className="widget-props-page__prop-default">Default: {prop.defaultValue}</div>
                ) : null}
                <p className="widget-props-page__prop-description">{prop.description}</p>
                {prop.example ? (
                  <div className="widget-props-page__prop-example">{prop.example}</div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="widget-props-page__heading">Metric Themes</h2>
          <div className="widget-props-page__theme-grid">
            {metricThemeOptions.map((theme) => (
              <article key={theme} className="widget-props-page__theme-card" data-theme={theme}>
                <div className="widget-props-page__theme-swatch" />
                <div className="widget-props-page__theme-name">metric=&quot;{theme}&quot;</div>
              </article>
            ))}
          </div>
        </section>

        <section className="widget-props-page__usage-grid">
          {usageExamples.map((example) => (
            <article key={example.title} className="widget-props-page__example">
              <div className="widget-props-page__example-header">
                <div>
                  <h2 className="widget-props-page__heading mb-2">{example.title}</h2>
                  <p className="widget-props-page__copy">{example.description}</p>
                </div>
                <span className="widget-props-page__code-label">TSX</span>
              </div>
              <pre className="widget-props-page__code"><code>{example.code}</code></pre>
            </article>
          ))}
        </section>

        <section className="widget-props-page__example">
          <div className="widget-props-page__example-header">
            <div>
              <h2 className="widget-props-page__heading mb-2">Implementation Template</h2>
              <p className="widget-props-page__copy">
                Use this pattern when converting an existing widget to the standard prop contract.
              </p>
            </div>
            <span className="widget-props-page__code-label">TSX</span>
          </div>
          <pre className="widget-props-page__code"><code>{metricWidgetImplementationExample}</code></pre>
        </section>
      </div>
    </main>
  );
}
