import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { MetricCardShell } from "@/widgets/_shared/MetricCardShell";
import { CardHeaderData } from "@/widgets/metric-cards/components/card-header";

const data = [
  { v: 40, variance: 60 },
  { v: 70, variance: 30 },
  { v: 30, variance: 70 },
  { v: 50, variance: 50 },
  { v: 20, variance: 80 },
  { v: 65, variance: 35 },
];

export const RevenueCard = () => (
  <MetricCardShell metric="total" className="h-64">
    <CardHeaderData value="$42.5k" change="-22%" label="Total Revenue" />

    <div className="h-28 min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Bar
            dataKey="v"
            stackId="a"
            barSize={12}
            fill="var(--metric-color)"
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </MetricCardShell>
);
