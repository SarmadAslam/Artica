import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface MonthData {
  name: string;
  count: number;
  date: Date;
}

interface Props {
  chartType: 'bar' | 'line' | 'area';
  setChartType: (value: 'bar' | 'line' | 'area') => void;
  selectedType: string;
  processedData: MonthData[];
  title: string;
  color: string;
}

export default function ActivityChart({
  chartType,
  setChartType,
  selectedType,
  processedData,
  title,
  color,
}: Props) {
  const chartProps = {
    data: processedData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 }
  };

  const capitalized = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Monthly {selectedType} over the last 6 months</CardDescription>
        </div>
        <Tabs value={chartType} onValueChange={(v: any) => setChartType(v)} className="w-fit">
          <TabsList className="grid grid-cols-3 h-8 w-fit">
            <TabsTrigger value="bar" className="text-xs px-2">Bar</TabsTrigger>
            <TabsTrigger value="line" className="text-xs px-2">Line</TabsTrigger>
            <TabsTrigger value="area" className="text-xs px-2">Area</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' && (
              <BarChart {...chartProps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={color} name={capitalized} />
              </BarChart>
            )}

            {chartType === 'line' && (
              <LineChart {...chartProps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={color}
                  activeDot={{ r: 8 }}
                  name={capitalized}
                />
              </LineChart>
            )}

            {chartType === 'area' && (
              <AreaChart {...chartProps}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="count"
                  fill={color}
                  stroke={color}
                  name={capitalized}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm" className="ml-auto">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Analytics Report
        </Button>
      </CardFooter>
    </Card>
  );
}
