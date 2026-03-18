
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, Bar , ResponsiveContainer} from 'recharts';
import  { CardHeaderData }  from "@/widgets/metric-cards/components/card-header";

const data = [
  { v: 40, light: 60 }, { v: 70, light: 30 }, { v: 30, light: 70 }, 
  { v: 50, light: 50 }, { v: 20, light: 80 }, { v: 65, light: 35 }
];

export const ProfitCard = () => (
    <Card className="p-6 h-64 border-none shadow-md">
        <CardHeaderData value="$88.5k" change="-18%" label="Total Profit" />
        <ResponsiveContainer width="100%" height={100}>
            <BarChart data={data}>
                <Bar
                    dataKey="v"
                    stackId="a"
                    barSize={10}
                    radius={[0, 0, 4, 4]}
                    // Logic: if you had different colors per bar, you'd use a function:
                    // fill={(entry) => entry.name === 'Special' ? '#color1' : '#color2'}
                    fill="#C92100"
                />
            </BarChart>
        </ResponsiveContainer>
    </Card>
);
