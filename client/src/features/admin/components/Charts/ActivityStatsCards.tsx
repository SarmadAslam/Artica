import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdditionalInfo {
  label: string;
  value: string | number;
}

interface Props {
  stats: {
    total: number;
    lastMonth: number;
    growth: string;
  };
  additionalInfo: AdditionalInfo[];
  selectedType: string;
  getIcon: (type: string) => JSX.Element;
}

const formatNumber = (num: number | string) => {
  return new Intl.NumberFormat().format(Number(num));
};

export default function ActivityStatsCards({
  stats,
  additionalInfo,
  selectedType,
  getIcon,
}: Props) {
  const growth = Number(stats.growth);
  const title = `Total ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-md hover:shadow-lg transition-all cursor-pointer">
        <CardHeader>
          <CardDescription className="flex items-center text-muted-foreground">
            {getIcon(selectedType)}
            <span className="ml-2 font-medium">{title}</span>
          </CardDescription>
          <div className="flex items-baseline justify-between mt-2">
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {formatNumber(stats.total)}
            </CardTitle>
            <span
              className={`text-sm font-medium flex items-center gap-1 ${
                growth > 0
                  ? 'text-green-500'
                  : growth < 0
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}
            >
              {growth > 0 && <ArrowUpRight className="h-4 w-4" />}
              {growth < 0 && <ArrowDownRight className="h-4 w-4" />}
              {growth > 0 ? '+' : ''}
              {stats.growth}%
            </span>
          </div>
        </CardHeader>
        <CardFooter className="pt-0 text-sm text-muted-foreground">
          Compared to previous month
        </CardFooter>
      </Card>

      {additionalInfo?.map((info, idx) => (
        <Card
          key={idx}
          className="shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <CardHeader>
            <CardDescription className="text-muted-foreground">
              {info.label}
            </CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {formatNumber(info.value)}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
