import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
  } from '@/components/ui/card';
  
  interface MonthData {
    name: string;
    count: number;
    date: Date;
  }
  
  interface Props {
    titles: Record<string, string>;
    processedData: Record<string, MonthData[]>;
    getIcon: (type: string) => JSX.Element;
    colors: Record<string, string>;
  }
  
  // Utility: convert hex to rgba with fallback
  const hexToRGBA = (hex: string, alpha: number = 0.12) => {
    if (!hex.startsWith('#') || hex.length !== 7) return `rgba(0, 0, 0, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const OverviewCard = ({
    icon,
    title,
    value,
    bgColor
  }: {
    icon: JSX.Element;
    title: string;
    value: number;
    bgColor: string;
  }) => (
    <div className="p-4 rounded-lg bg-muted/30 flex flex-col items-center shadow">
      <div
        className="p-2 rounded-full mb-2"
        
        aria-hidden="true"
        role="presentation"
      >
        {icon}
      </div>
      <h3 className="font-medium text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">Last month</p>
    </div>
  );
  
  export default function RecentOverview({
    titles,
    processedData,
    getIcon,
    colors
  }: Props) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Overview</CardTitle>
          <CardDescription>Summary of activity across all platform sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(titles).map(([key, title]) => {
              const latestEntry = processedData[key]?.at(-1);
              const value = latestEntry?.count ?? 0;
              const bgColor = hexToRGBA(colors[key]);
  
              return (
                <OverviewCard
                  key={key}
                  icon={getIcon(key)}
                  title={title}
                  value={value}
                  bgColor={bgColor}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
  