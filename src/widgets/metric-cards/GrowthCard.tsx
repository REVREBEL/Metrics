

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import  { CardHeaderData }  from "@/widgets/metric-cards/components/card-header";

const growthData = [
    { v: 40, fill: "#C92100" },
    { v: 30, fill: "#F9C775" },
    { v: 30, fill: "#A7C7D7" }
];

export const GrowthCard = () => (
    <Card className="p-6 h-64 border-none shadow-md relative">
        <CardHeaderData value="$27.9k" change="+49%" label="Total Growth" />
        <div className="flex justify-center items-center h-24">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={growthData}
                        innerRadius={30}
                        outerRadius={45}
                        dataKey="v"
                        paddingAngle={5}
                        stroke="none" // Removes the default white border if desired
                    />
                </PieChart>
            </ResponsiveContainer>
            <span className="absolute bottom-12 text-xs font-serif font-bold text-dark-blue">$23K</span>
        </div>
    </Card>
);