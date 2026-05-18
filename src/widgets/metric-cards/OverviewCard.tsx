import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { MetricCardShell } from "@/widgets/_shared/MetricCardShell";
import { CardHeaderData } from "@/widgets/metric-cards/components/card-header";

const growthData = [
  { v: 40, fill: "var(--color-negative)" },
  { v: 30, fill: "var(--color-group-var)" },
  { v: 30, fill: "var(--color-total-var)" },
];

export const OverviewCard = () => (
  <MetricCardShell metric="total" className="h-64">
    <CardHeaderData value="$67.1k" change="+32%" label="Overview" />
    <div className="relative flex h-32 min-h-0 min-w-0 items-center justify-center">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <PieChart>
          <Pie
            data={growthData}
            innerRadius={34}
            outerRadius={52}
            dataKey="v"
            paddingAngle={5}
            stroke="none"
            isAnimationActive={false}
          >
            {growthData.map((entry, index) => (
              <Cell key={`overview-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="absolute bottom-0 font-display text-lg font-bold tracking-widest text-(--foreground) uppercase">
        75%
      </span>
    </div>
  </MetricCardShell>
);
