
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import  { CardHeaderData }  from "@/widgets/metric-cards/components/card-header";

const data = [
  { v: 40, light: 60 }, { v: 70, light: 30 }, { v: 30, light: 70 },
  { v: 50, light: 50 }, { v: 20, light: 80 }, { v: 65, light: 35 }
];

export const RevenueCard = () => (
  <Card className="p-6 h-64 border-none shadow-md">
    <CardHeaderData value="$42.5k" change="-22%" label="Total Revenue" />
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar
          dataKey="v"
          stackId="a"
          barSize={12}
          fill="#F9C775"
          radius={[0, 0, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

