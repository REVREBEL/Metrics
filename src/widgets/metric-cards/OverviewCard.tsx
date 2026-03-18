
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart, Pie , ResponsiveContainer} from 'recharts';
import  { CardHeaderData }  from "@/widgets/metric-cards/components/card-header";


const growthData = [
    { v: 40, fill: "#C92100" },
    { v: 30, fill: "#F9C775" },
    { v: 30, fill: "#A7C7D7" }
];

export const OverviewCard = () => (
    <Card className="p-6 h-64 border-none shadow-md relative">
        <CardHeaderData value="$67.1k" change="+32%" label="Overview" />
        <div className="flex justify-center items-center h-24">
            <ResponsiveContainer width="100%" height="100%">
                <Pie
                    data={growthData}
                    innerRadius={30}
                    outerRadius={45}
                    dataKey="v"
                    paddingAngle={5}
                    stroke="none" // Removes the default white border if desired
                />
            </ResponsiveContainer>
            <span className="absolute bottom-10 text-lg font-bold text-[#0B1E3B]">75%</span>
        </div>
    </Card>
);