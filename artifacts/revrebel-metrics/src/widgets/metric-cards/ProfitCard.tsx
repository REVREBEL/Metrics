import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { MetricCardShell } from "@/widgets/_shared/MetricCardShell";
import { CardHeaderData } from "@/widgets/metric-cards/components/card-header";

const data = [
  { v: 40 },
  { v: 70 },
  { v: 30 },
  { v: 50 },
  { v: 20 },
  { v: 65 },
];

export const ProfitCard = () => (
  <MetricCardShell metric="negative" className="h-64">
    <CardHeaderData value="$88.5k" change="-18%" label="Total Profit" />
    <div className="h-28 min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Bar
            dataKey="v"
            stackId="a"
            barSize={12}
            radius={[2, 2, 0, 0]}
            fill="var(--metric-color)"
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </MetricCardShell>
);
