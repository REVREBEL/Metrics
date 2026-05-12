import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getMetricThemeClass, type MetricTheme } from "./metric-theme";

type MetricCardShellProps = {
  title?: string;
  eyebrow?: string;
  metric?: MetricTheme;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerAction?: React.ReactNode;
};

export function MetricCardShell({
  title,
  eyebrow,
  metric = "total",
  children,
  className,
  contentClassName,
  headerAction,
}: MetricCardShellProps) {
  return (
    <Card className={cn("metric-card", getMetricThemeClass(metric), className)}>
      {(title || eyebrow || headerAction) && (
        <CardHeader className="metric-card__header">
          <div className="metric-card__heading">
            <div className="metric-card__heading-text">
              {eyebrow && <p className="metric-card__eyebrow">{eyebrow}</p>}
              {title && <CardTitle className="metric-card__title">{title}</CardTitle>}
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
