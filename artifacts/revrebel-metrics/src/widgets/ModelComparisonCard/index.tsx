"use client";

import { ArrowRight, CheckCircle2, ChevronDown, Minus, Plus } from "lucide-react";

import { MetricCard } from "@/widgets/_shared/MetricCard";

const channelData = [
  { name: "Organic Social", change: 26.4 },
  { name: "Referral", change: 9.7 },
  { name: "Paid Search", change: 9.5 },
  { name: "Unassigned", change: 0.1 },
  { name: "Direct", change: 0.0 },
  { name: "Email", change: 0.0 },
  { name: "Paid Social", change: 0.0 },
];

function ComparisonBar({ value }: { value: number }) {
  const max = 50;
  const width = Math.min(Math.abs(value), max);
  const isPositive = value >= 0;

  return (
    <div className="model-comparison-card__bar-track" aria-hidden="true">
      <div className="model-comparison-card__bar-baseline" />
      <div
        className="model-comparison-card__bar-fill"
        data-direction={isPositive ? "positive" : "negative"}
        style={{ width: `${(width / max) * 50}%` }}
      />
    </div>
  );
}

export default function ModelComparisonCard() {
  return (
    <MetricCard
      title="Model Comparison"
      description="Compare key event attribution movement by primary channel group."
      metric="positive"
      className="max-w-2xl"
    >
      <div className="model-comparison-card">
        <div className="model-comparison-card__controls">
          <div className="model-comparison-card__control">
            <button className="model-comparison-card__control-button" type="button">
              Last click
              <ChevronDown className="size-4" />
            </button>
            <p className="model-comparison-card__control-description">
              Paid and organic channels
            </p>
          </div>

          <span className="model-comparison-card__vs">vs</span>

          <div className="model-comparison-card__control">
            <button className="model-comparison-card__control-button" type="button">
              Data-driven
              <ChevronDown className="size-4" />
            </button>
            <p className="model-comparison-card__control-description">
              Paid and organic channels
            </p>
          </div>

          <button className="model-comparison-card__status" type="button" aria-label="Model comparison status">
            <CheckCircle2 className="size-4" />
            <ChevronDown className="size-3" />
          </button>
        </div>

        <div className="model-comparison-card__table-header">
          <span className="model-comparison-card__header-label">
            Primary Channel Group
          </span>
          <div className="model-comparison-card__header-actions">
            <span className="model-comparison-card__header-label">Key Events % Change</span>
            <button className="model-comparison-card__icon-button" type="button" aria-label="Decrease comparison scale">
              <Minus className="size-3" />
            </button>
            <button className="model-comparison-card__icon-button" type="button" aria-label="Increase comparison scale">
              <Plus className="size-3" />
            </button>
          </div>
        </div>

        <div className="model-comparison-card__rows">
          {channelData.map((channel) => (
            <div key={channel.name} className="model-comparison-card__row">
              <span className="model-comparison-card__channel-name">{channel.name}</span>
              <div className="model-comparison-card__metric">
                <span className="model-comparison-card__change">
                  {channel.change.toFixed(1)}%
                </span>
                <ComparisonBar value={channel.change} />
              </div>
            </div>
          ))}
        </div>

        <div className="model-comparison-card__footer">
          <button className="model-comparison-card__cta" type="button">
            View model comparison
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </MetricCard>
  );
}
