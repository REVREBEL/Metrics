"use client";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

import { MetricCardShell } from "@/widgets/_shared/MetricCardShell";
import { CardHeaderData } from "@/widgets/metric-cards/components/card-header";

const genderData = [
  { name: "Female", value: 54.9, fill: "var(--color-total)" },
  { name: "Male", value: 45.1, fill: "var(--color-total-var)" },
];

export function ActiveUsersGenderCard() {
  return (
    <MetricCardShell metric="total" className="relative w-full">
      <CardHeaderData value="Gender Split" change="+4.9%" label="Active Users" />

      <div className="flex h-40 min-h-0 min-w-0 items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <PieChart>
            <Pie
              data={genderData}
              innerRadius={50}
              outerRadius={66}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              cornerRadius={4}
              stroke="none"
              isAnimationActive={false}
            >
              {genderData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex justify-center gap-6">
        {genderData.map((gender) => (
          <div key={gender.name} className="flex items-center gap-2">
            <div className="h-2 w-2" style={{ backgroundColor: gender.fill }} />
            <div className="flex flex-col">
              <span className="metric-card__label">{gender.name}</span>
              <span className="metric-card__number text-2xl">{gender.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </MetricCardShell>
  );
}

const interestsData = [
  { name: "News & Politics/Avid News ...", value: 650 },
  { name: "Travel/Travel Buffs", value: 485 },
  { name: "Banking & Finance/Avid Inve...", value: 450 },
  { name: "Sports & Fitness/Sports Fan...", value: 422 },
  { name: "Shoppers/Shopping Enthusi...", value: 416 },
  { name: "Technology/Technophiles", value: 406 },
  { name: "Lifestyles & Hobbies/Shutter...", value: 400 },
];

export function ActiveUsersInterestsCard() {
  return (
    <MetricCardShell metric="total" className="w-full">
      <CardHeaderData value="Active Users" change="+12%" label="Top Interests" />

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-(--border)">
            <tr>
              <th className="metric-card__label pb-3">Interests</th>
              <th className="metric-card__label pb-3 text-right">Active Users</th>
            </tr>
          </thead>
          <tbody>
            {interestsData.map((interest, index) => (
              <tr
                key={interest.name}
                className={index !== interestsData.length - 1 ? "border-b border-(--border)" : ""}
              >
                <td className="py-3.5 font-display text-sm font-bold uppercase tracking-[0.04em] text-(--foreground)">
                  {interest.name}
                </td>
                <td className="metric-card__number py-3.5 text-right text-sm">
                  {interest.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MetricCardShell>
  );
}

const ageData = [
  { range: "35-44", value: 460 },
  { range: "25-34", value: 370 },
  { range: "45-54", value: 330 },
  { range: "55-64", value: 285 },
  { range: "18-24", value: 220 },
  { range: "65+", value: 195 },
];

export function ActiveUsersAgeCard() {
  return (
    <MetricCardShell metric="total" className="w-full">
      <CardHeaderData value="Active Users" change="+8%" label="Age Distribution" />

      <div className="mt-6 h-56 min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <BarChart
            data={ageData}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
            barCategoryGap={8}
          >
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                border: "2px solid var(--foreground)",
                borderRadius: 0,
                padding: "12px",
                background: "var(--card)",
                color: "var(--foreground)",
                boxShadow: "4px 4px 0 var(--foreground)",
              }}
              labelStyle={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase" }}
              itemStyle={{ fontFamily: "var(--font-numbers)", fontSize: "12px" }}
              formatter={(value) => `${value} Users`}
            />
            <YAxis
              dataKey="range"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fontWeight: 700,
                fill: "var(--foreground)",
                fontFamily: "var(--font-display)",
              }}
            />
            <Bar
              dataKey="value"
              fill="var(--metric-color)"
              radius={[0, 4, 4, 0]}
              barSize={20}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </MetricCardShell>
  );
}
