import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps
} from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const PIE_COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

interface Props {
  distributionData: {
    name: string;
    value: number;
  }[];
}

export default function DistributionPie({ distributionData }: Props) {
  const total = distributionData.reduce((sum, item) => sum + item.value, 0);

  // 👇 Custom label inside the component (so it can access distributionData)
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PieLabelRenderProps & { index: number }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius! + (outerRadius! - innerRadius!) * 1.2;
    const x = cx! + radius * Math.cos(-midAngle * RADIAN);
    const y = cy! + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={PIE_COLORS[index % PIE_COLORS.length]}
        textAnchor={x > cx! ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${distributionData[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution</CardTitle>
        <CardDescription>Platform content distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {distributionData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Total content items: {total}
        </p>
      </CardFooter>
    </Card>
  );
}
