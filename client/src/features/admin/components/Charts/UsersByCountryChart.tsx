"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getUsers } from "@/api/users";

// Country-specific colors
const COUNTRY_COLORS: Record<string, string> = {
  pakistan: "#006600",
  usa: "#3b82f6",
  canada: "#ef4444",
  germany: "#f59e0b",
  india: "#ff9933",
  uk: "#6366f1",
  france: "#60a5fa",
  others: "#9ca3af",
};

interface ChartData {
  name: string;
  users: number;
  fill: string;
}

export function UsersByCountryChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    getUsers()
      .then((users: any[]) => {
        const countryCount: Record<string, number> = {};

        users.forEach((user) => {
          const country = user.country?.trim().toLowerCase() || "unknown";
          countryCount[country] = (countryCount[country] || 0) + 1;
        });

        const sorted = Object.entries(countryCount).sort((a, b) => b[1] - a[1]);

        const topFive = sorted.slice(0, 5);
        const otherTotal = sorted.slice(5).reduce((sum, [, count]) => sum + count, 0);

        const formatted: ChartData[] = topFive.map(([name, count]) => {
          const normalized = name.toLowerCase();
          return {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            users: count,
            fill: COUNTRY_COLORS[normalized] || "#8884d8",
          };
        });

        if (otherTotal > 0) {
          formatted.push({
            name: "Others",
            users: otherTotal,
            fill: COUNTRY_COLORS["others"],
          });
        }

        setChartData(formatted);
      })
      .catch(() => setChartData([]));
  }, []);

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-1 text-center">
        <CardTitle>Registered Users by Country</CardTitle>
        <CardDescription>Top countries by user registrations</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center gap-4">
        <div className="aspect-square max-h-[248px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}`, name]}
              />
              <Pie
                data={chartData}
                dataKey="users"
                nameKey="name"
                outerRadius={80}
                labelLine={false}
                label={renderLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {chartData.map((entry, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="block h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
