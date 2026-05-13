import { CartesianGrid, Line, LineChart, ResponsiveContainer } from "recharts";
import { MetricCardShell } from "@/widgets/_shared/MetricCardShell";
import { CardHeaderData } from "@/widgets/metric-cards/components/card-header";

const lineData = [{ v: 10 }, { v: 40 }, { v: 25 }, { v: 60 }, { v: 50 }, { v: 90 }];

export const SessionsCard = () => (
  <MetricCardShell metric="total" className="h-64">
    <CardHeaderData value="24.5k" change="+42%" label="Sessions" />
    <div className="h-28 min-h-0 min-w-0">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={lineData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical
            horizontal={false}
            stroke="var(--border)"
          />
          <Line
            type="linear"
            dataKey="v"
            stroke="var(--metric-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--metric-color)", strokeWidth: 2, stroke: "var(--card)" }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </MetricCardShell>
);
