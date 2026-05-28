import {
  metricLayoutImplementationExample,
  metricLayoutPropDefinitions,
  metricThemeGroups,
  metricWidgetImplementationExample,
  standardMetricWidgetPropDefinitions,
  widgetUsageGroups,
} from "@/widgets/props";
import {
  MetricCard,
  MetricCardTabs,
  MetricInsight,
  MetricLayout,
  MetricLayoutGroup,
} from "@/widgets/_shared/MetricCard";

const exampleTabs = [
  { label: "Budget", value: "budget" },
  { label: "OTB", value: "otb" },
  { label: "STLY", value: "stly" },
];

const usageExamples = [
  {
    category: "Elements",
    title: "Metric Layout",
    description: "Use MetricLayout inside any card, table row, chart header, or dashboard strip for consistent metric typography.",
    code: `<MetricLayout
  label="ADR"
  value="$362.47"
  change="0.0%"
  changeLabel="STLY"
  trend="up"
  metric="transient"
  variant="row"
  size="md"
/>`,
  },
  {
    category: "Elements",
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
    category: "Cards",
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
    category: "Cards",
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
    category: "Layouts",
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

function PropGrid({
  title,
  props,
}: {
  title: string;
  props: typeof standardMetricWidgetPropDefinitions;
}) {
  return (
    <section>
      <h2 className="widget-props-page__heading">{title}</h2>
      <div className="widget-props-page__prop-grid">
        {props.map((prop) => (
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
  );
}

export default function WidgetPropsShowcasePage() {
  return (
    <main className="widget-props-page">
      <div className="widget-props-page__inner">
        <section className="widget-props-page__hero metric-card--total">
          <div className="widget-props-page__eyebrow">Widget System</div>
          <h1 className="widget-props-page__title">Metric Props</h1>
          <p className="widget-props-page__subtitle">
            A working reference for the standard props every configurable dashboard widget should support:
            title, eyebrow, description, metric theme, sizing classes, header actions, tabs, and reusable metric layouts.
          </p>
        </section>

        <section className="widget-props-page__grid">
          <div className="widget-props-page__panel">
            <h2 className="widget-props-page__heading">Recommended Contract</h2>
            <p className="widget-props-page__copy">
              Every reusable widget should accept the standard metric-card props, pass them into
              MetricCard, then use MetricLayout for repeated metric values inside the card. This keeps
              the dashboard builder predictable while still allowing each widget to have custom internals.
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
            <MetricLayoutGroup columns={3} className="mt-6">
              <MetricLayout
                label="Rooms"
                value="876"
                change="4.2%"
                changeLabel="STLY"
                trend="up"
                metric="transient"
                variant="stack"
                size="md"
              />
              <MetricLayout
                label="ADR"
                value="$362"
                change="1.8%"
                changeLabel="STLY"
                trend="up"
                metric="group"
                variant="stack"
                size="md"
              />
              <MetricLayout
                label="Revenue"
                value="$318K"
                change="6.5%"
                changeLabel="STLY"
                trend="up"
                metric="total"
                variant="stack"
                size="md"
              />
            </MetricLayoutGroup>
            <MetricInsight className="mt-6">
              This example uses the shared title, description, metric theme, tabs, MetricLayout values,
              and insight styles.
            </MetricInsight>
          </MetricCard>
        </section>

        <MetricCard
          title="MetricLayout Preview"
          description="Portable metric blocks for cards, charts, tables, and dashboard summaries."
          metric="transient"
        >
          <MetricLayoutGroup columns={4}>
            <MetricLayout
              label="Stacked"
              value="0.0%"
              change="0.0%"
              changeLabel="STLY"
              trend="up"
              metric="transient"
              variant="stack"
              size="md"
            />
            <MetricLayout
              label="Split"
              value="0.0%"
              change="0.0%"
              changeLabel="STLY"
              trend="up"
              metric="group"
              variant="split"
              size="md"
            />
            <MetricLayout
              label="Row"
              value="$362"
              change="0.0%"
              changeLabel="STLY"
              trend="up"
              metric="total"
              variant="row"
              size="md"
            />
            <MetricLayout
              label="No Var"
              value="$318K"
              trend="neutral"
              metric="positive"
              variant="row"
              size="md"
              varianceVisibility={false}
            />
          </MetricLayoutGroup>
        </MetricCard>

        <PropGrid title="Standard Widget Props" props={standardMetricWidgetPropDefinitions} />
        <PropGrid title="MetricLayout Props" props={metricLayoutPropDefinitions} />

        <section>
          <h2 className="widget-props-page__heading">Metric Themes</h2>
          <div className="widget-props-page__theme-sections">
            {metricThemeGroups.map((group) => (
              <section key={group.title} className="widget-props-page__theme-section">
                <div className="widget-props-page__theme-section-header">
                  <h3 className="widget-props-page__subheading">{group.title}</h3>
                  <p className="widget-props-page__copy">{group.description}</p>
                </div>
                <div className="widget-props-page__theme-grid">
                  {group.items.map((theme) => (
                    <article
                      key={`${group.title}-${theme.value}`}
                      className="widget-props-page__theme-card"
                      style={{
                        "--theme-color": `var(${theme.cssVar}, var(--muted-foreground))`,
                        "--theme-inverse-color": theme.inverseVar
                          ? `var(${theme.inverseVar}, var(--background))`
                          : "var(--background)",
                        "--theme-variance-color": theme.varianceVar
                          ? `var(${theme.varianceVar}, var(--muted-foreground))`
                          : "var(--muted-foreground)",
                      } as React.CSSProperties}
                    >
                      <div className="widget-props-page__theme-swatch" />
                      <div className="widget-props-page__theme-name">{theme.label}</div>
                      <div className="widget-props-page__theme-token">Main: {theme.cssVar}</div>
                      {theme.inverseVar ? (
                        <div className="widget-props-page__theme-token widget-props-page__theme-token--inverse">
                          Inverse: {theme.inverseVar}
                        </div>
                      ) : null}
                      {theme.varianceVar ? (
                        <div className="widget-props-page__theme-token widget-props-page__theme-token--variance">
                          Var: {theme.varianceVar}
                        </div>
                      ) : null}
                      {theme.notes ? <p className="widget-props-page__theme-note">{theme.notes}</p> : null}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section>
          <h2 className="widget-props-page__heading">Usage</h2>
          <div className="widget-props-page__usage-sections">
            {widgetUsageGroups.map((group) => (
              <article key={group.title} className="widget-props-page__usage-card">
                <h3 className="widget-props-page__subheading">{group.title}</h3>
                <p className="widget-props-page__copy">{group.description}</p>
                <div className="widget-props-page__usage-tags">
                  {group.examples.map((example) => (
                    <span key={example} className="widget-props-page__usage-tag">
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="widget-props-page__usage-grid">
          {usageExamples.map((example) => (
            <article key={example.title} className="widget-props-page__example">
              <div className="widget-props-page__example-header">
                <div>
                  <div className="widget-props-page__eyebrow mb-2">{example.category}</div>
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

        <section className="widget-props-page__example">
          <div className="widget-props-page__example-header">
            <div>
              <h2 className="widget-props-page__heading mb-2">MetricLayout Template</h2>
              <p className="widget-props-page__copy">
                Use this inside MetricCard when a widget has repeated metric values.
              </p>
            </div>
            <span className="widget-props-page__code-label">TSX</span>
          </div>
          <pre className="widget-props-page__code"><code>{metricLayoutImplementationExample}</code></pre>
        </section>
      </div>
    </main>
  );
}
