"use client";
// @ts-nocheck

import React, { Component, ReactNode } from "react";
import dynamic from "next/dynamic";

// Error boundary to prevent one broken widget from taking down the page
class ErrorBoundary extends Component<{ children: ReactNode; name: string }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded bg-red-50 p-4 text-red-800">
          <h3 className="font-bold">Failed to render {this.props.name}</h3>
          <p className="mt-2 max-h-32 overflow-auto text-xs">{String(this.state.error)}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const Default_widgetsDailyPickupTable = dynamic(() => import("@/widgets/DailyPickupTable"), {
  ssr: false,
});

export default function DailyPickupTablePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-8 text-3xl font-bold">DailyPickupTable</h1>

      <div className="col-span-full flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2
          className="mb-4 truncate border-b pb-2 font-mono text-sm text-slate-500"
          title="@/widgets/DailyPickupTable (Default)"
        >
          @/widgets/DailyPickupTable (Default)
        </h2>

        <div className="flex min-h-[300px] w-full flex-1 flex-col items-stretch overflow-auto">
          <ErrorBoundary name="@/widgets/DailyPickupTable (Default)">
            <Default_widgetsDailyPickupTable />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
