"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis
} from "recharts";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  ChartConfig, ChartContainer, ChartLegend,
  ChartLegendContent, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { getUsers } from "@/api/users";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  artist: {
    label: "Artist",
    color: "hsl(var(--chart-1))",
  },
  client: {
    label: "Client",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function formatUserData(users: any[], range: string): any[] {
  const now = new Date("2024-06-30"); // or use new Date()
  let days = 90;
  if (range === "30d") days = 30;
  if (range === "7d") days = 7;

  const startDate = new Date(now);
  startDate.setDate(now.getDate() - days);

  const buckets: Record<string, { artist: number; client: number }> = {};

  users.forEach((user) => {
    const date = new Date(user.signupDate || user.createdAt);
    if (date < startDate) return;

    const key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const role = user.role === "artist" ? "artist" : "client";

    if (!buckets[key]) buckets[key] = { artist: 0, client: 0 };
    buckets[key][role]++;
  });

  return Object.entries(buckets)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, counts]) => ({ date, ...counts }));
}

export function UsersChart() {
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = formatUserData(users, timeRange);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>User Growth Chart</CardTitle>
          <CardDescription>
            Comparing Artists vs Clients signups over selected range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillartist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-artist)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-artist)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillclient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-client)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-client)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="client"
              type="natural"
              fill="url(#fillclient)"
              stroke="var(--color-client)"
              stackId="a"
            />
            <Area
              dataKey="artist"
              type="natural"
              fill="url(#fillartist)"
              stroke="var(--color-artist)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
