// src/widgets/registry.ts
import React from 'react';

// Define the shape of a widget's metadata
export type WidgetMetadata = {
  id: string;
  name: string;
  description: string;
  defaultVariant: string;
};

export type WidgetProps = Record<string, unknown>;

function lazyWidget(factory: () => Promise<any>): React.ComponentType<WidgetProps> {
  const Lazy = React.lazy(factory);
  return function LazyWidget(props: WidgetProps) {
    return React.createElement(
      React.Suspense,
      { fallback: null },
      React.createElement(Lazy as any, props)
    );
  };
}

// Map widget IDs to their dynamic imports
export const WIDGET_COMPONENTS: Record<string, React.ComponentType<WidgetProps>> = {
  REVENUE_METRIC: lazyWidget(() => import('./RevenueMetric')),
  OCCUPANCY_GAUGE: lazyWidget(() => import('./OccupancyGauge')),
};

// Metadata for the "Configurator" UI
export const WIDGET_LIST: WidgetMetadata[] = [
  { 
    id: 'REVENUE_METRIC', 
    name: 'Revenue Metric', 
    description: 'High-impact total revenue tile',
    defaultVariant: 'is-color-1' 
  },
  // Adding a new widget here makes it appear in the Dashboard & Playground automatically
];
