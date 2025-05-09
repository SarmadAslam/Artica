// JobSectionCards.tsx
import { useFetchAllJobsQuery } from "@/api/jobApi";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

export function JobSectionCards() {
  const { data: jobs = [], isLoading } = useFetchAllJobsQuery(null);

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter((job: { isActive: boolean; }) => job.isActive !== false).length;
  const removedJobs = totalJobs - activeJobs;

  const midValues: Record<string, number> = {
    "Rs 1 to 5k": 3000,
    "Rs 6 to 15k": 10500,
    "Rs 16 to 25k": 20500,
  };

  let totalBudget = 0;
  let budgetCount = 0;

  jobs.forEach((job: { budget: string; customBudget: number; }) => {
    if (job.budget === "Other" && typeof job.customBudget === "number") {
      totalBudget += job.customBudget;
      budgetCount++;
    } else if (midValues[job.budget]) {
      totalBudget += midValues[job.budget];
      budgetCount++;
    }
  });

  const averageBudget = budgetCount > 0 ? Math.round(totalBudget / budgetCount) : 0;

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
    <Card className="shadow-md hover:shadow-lg hover:bg-muted/20 cursor-pointer">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {isLoading ? "..." : value}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        {trend && <div className="font-medium flex items-center gap-1">{trend}</div>}
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-4 lg:px-6">
      <StatCard
        label="Total Jobs"
        value={totalJobs}
        description="Jobs posted by clients"
      />
      <StatCard
        label="Active Jobs"
        value={activeJobs}
        description="Currently visible jobs"
      />
      <StatCard
        label="Removed Jobs"
        value={removedJobs}
        trend={<TrendingDownIcon className="size-4" />}
        description="Removed by admin"
      />
      <StatCard
        label="Avg Budget"
        value={`Rs ${averageBudget}`}
        trend={<TrendingUpIcon className="size-4" />}
        description="Across all jobs"
      />
    </div>
  );
}
