import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { MetricCardShell } from "@/widgets/_shared/MetricCardShell";

const data = [
  { v: 40, variance: 60 },
  { v: 70, variance: 30 },
  { v: 30, variance: 70 },
  { v: 50, variance: 50 },
  { v: 20, variance: 80 },
  { v: 65, variance: 35 },
];

export const RevenueCard = () => {
  const change = "-22%";
  const isNegative = change.startsWith("-");

  return (
    <MetricCardShell metric="total" className="h-64">
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-bold text-dark-blue">$42.5k</h3>
          <span
            className={
              isNegative
                ? "text-[10px] font-bold metric-card__change--negative"
                : "text-[10px] font-bold metric-card__change--positive"
            }
          >
            {change}
          </span>
        </div>
        <p className="metric-card__label">Total Revenue</p>
      </div>

      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Bar
            dataKey="v"
            stackId="a"
            barSize={12}
            fill="var(--metric-color)"
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </MetricCardShell>
  );
};
