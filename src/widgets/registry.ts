// src/widgets/registry.ts
import dynamic from 'next/dynamic';

// Define the shape of a widget's metadata
export type WidgetMetadata = {
  id: string;
  name: string;
  description: string;
  defaultVariant: string;
};

// Map widget IDs to their dynamic imports
export const WIDGET_COMPONENTS: Record<string, any> = {
  REVENUE_METRIC: dynamic(() => import('./RevenueMetric')),
  OCCUPANCY_GAUGE: dynamic(() => import('./OccupancyGauge')),
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
