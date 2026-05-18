import * as React from "react";

import { cn } from "@/lib/utils";
import type { ResolvedMetricTrend } from "./MetricLayout";

type MetricTrendIconProps = React.SVGProps<SVGSVGElement> & {
  trend: ResolvedMetricTrend;
};

function ArrowCircleUpIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("metric-layout__trend-icon", className)}
      {...props}
    >
      <circle className="metric-layout__trend-icon-circle" cx="100" cy="100" r="97.5" />
      <path
        className="metric-layout__trend-icon-arrow"
        d="M141.54,87.75l-38.57-53.91c-.71-.98-1.84-1.55-3.03-1.57h-.01c-1.21,0-2.34.58-3.03,1.55l-38.32,53.89c-.81,1.12-.92,2.62-.28,3.86.62,1.23,1.91,2.01,3.3,2.01h18.03v48.41c-.01,2.06,1.65,3.72,3.7,3.72h33.36c2.04-.01,3.72-1.69,3.72-3.74v-48.43h18.03c1.39,0,2.66-.78,3.3-2.03s.52-2.74-.3-3.88l.12.1Z"
      />
    </svg>
  );
}

function ArrowCircleDownIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("metric-layout__trend-icon", className)}
      {...props}
    >
      <circle className="metric-layout__trend-icon-circle" cx="100" cy="100" r="97.5" />
      <path
        className="metric-layout__trend-icon-arrow"
        d="M58.46,112.25l38.57,53.91c.71.98,1.84,1.55,3.03,1.57h.01c1.21,0,2.34-.58,3.03-1.55l38.32-53.89c.81-1.12.92-2.62.28-3.86-.62-1.23-1.91-2.01-3.3-2.01h-18.03s.01-48.41.01-48.41c0-2.06-1.67-3.72-3.72-3.72h-33.36c-2.04.01-3.72,1.69-3.72,3.74v48.43s-18.03,0-18.03,0c-1.39,0-2.66.78-3.3,2.03s-.52,2.74.3,3.88l-.12-.1Z"
      />
    </svg>
  );
}

export function MetricTrendIcon({ trend, ...props }: MetricTrendIconProps) {
  if (trend === "up") return <ArrowCircleUpIcon {...props} />;
  if (trend === "down") return <ArrowCircleDownIcon {...props} />;
  return null;
}
