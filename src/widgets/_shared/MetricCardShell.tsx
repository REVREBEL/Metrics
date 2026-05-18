import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getMetricThemeClass, type MetricTheme } from "./metric-theme";
import {
  getMetricSourceClass,
  getMetricSourceDataAttributes,
  getSourceTypeForLegacyMetric,
  type MetricSource,
  type MetricSourceType,
} from "./metric-source";

type MetricCardShellProps = {
  title?: string;
  eyebrow?: string;
  description?: React.ReactNode;
  metric?: MetricTheme;
  sourceType?: MetricSourceType;
  source?: MetricSource;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerAction?: React.ReactNode;
};

export function MetricCardShell({
  title,
  eyebrow,
  description,
  metric = "total",
  sourceType,
  source,
  children,
  className,
  contentClassName,
  headerAction,
}: MetricCardShellProps) {
  const resolvedSourceType = sourceType ?? getSourceTypeForLegacyMetric(metric);
  const resolvedSource = source ?? metric;

  return (
    <Card
      className={cn(
        "metric-card",
        getMetricThemeClass(metric),
        getMetricSourceClass(resolvedSourceType, resolvedSource),
        className
      )}
      {...getMetricSourceDataAttributes(resolvedSourceType, resolvedSource)}
    >
      {(title || eyebrow || description || headerAction) && (
        <CardHeader className="metric-card__header">
          <div className="metric-card__heading">
            <div className="metric-card__heading-text">
              {eyebrow && <p className="metric-card__eyebrow">{eyebrow}</p>}
              {title && <CardTitle className="metric-card__title">{title}</CardTitle>}
              {description && <p className="metric-card__description">{description}</p>}
            </div>
            {headerAction && <div className="metric-card__header-action">{headerAction}</div>}
          </div>
        </CardHeader>
      )}

      <CardContent className={cn("metric-card__content", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
