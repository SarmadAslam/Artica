import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers } from "@/api/users";

export function SectionCards() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  // Derived stats
  const totalUsers = users.length;
  const totalClients = users.filter(u => u.role === 'client').length;
  const totalArtists = users.filter(u => u.role === 'artist').length;

  // Calculate growth rate (month-over-month new users)
  const now = new Date();
  const createdThisMonth = users.filter(u => {
    const date = new Date(u.createdAt);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  const createdLastMonth = users.filter(u => {
    const date = new Date(u.createdAt);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
  }).length;

  const growthRate =
    createdLastMonth === 0 ? 0 : (((createdThisMonth - createdLastMonth) / createdLastMonth) * 100).toFixed(1);

  const StatCard = ({
    label,
    value,
    trend,
    description,
  }: {
    label: string;
    value: string | number;
    trend?: React.ReactNode;
    description: string;
  }) => (
    <Card className="@container/card shadow-md hover:shadow-lg hover:bg-muted/20 cursor-pointer">
      <CardHeader className="relative">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {loading ? "..." : value}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        {trend && (
          <div className="line-clamp-1 flex gap-2 font-medium">{trend}</div>
        )}
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <StatCard
        label="Total Users"
        value={totalUsers}
        trend={<>{createdThisMonth} new this month</>}
        description="Total registered users"
      />
      <StatCard
        label="Total Clients"
        value={totalClients}
        trend={
          <>
            <TrendingDownIcon className="size-4" /> Client acquisition trend
          </>
        }
        description="Users with client role"
      />
      <StatCard
        label="Total Artists"
        value={totalArtists}
        trend={
          <>
            <TrendingUpIcon className="size-4" /> New artist signups
          </>
        }
        description="Users with artist role"
      />
      <StatCard
        label="Growth Rate"
        value={`${growthRate}%`}
        trend={
          <>
            <TrendingUpIcon className="size-4" /> Compared to last month
          </>
        }
        description="User growth over time"
      />
    </div>
  );
}
