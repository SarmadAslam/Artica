

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, CartesianGrid, Area, XAxis } from "recharts";
import { TrendingUpIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TableSchema } from "@/types/table";
import { EditableField } from "./editable-field";

interface TableCellViewerProps {
  item: TableSchema;
}

const sectionTypes = [
  "Table of Contents",
  "Executive Summary",
  "Technical Approach",
  "Design",
  "Capabilities",
  "Focus Documents",
  "Narrative",
  "Cover Page",
];

const statuses = ["Done", "In Progress", "Not Started"];

const reviewers = ["Eddie Lake", "Jamik Tashpulatov", "Emily Whalen"];

export function TableCellViewer({ item }: TableCellViewerProps) {
  const isMobile = useIsMobile();

  const mockSave = async (val: string): Promise<void> =>
    new Promise((res) => setTimeout(res, 500));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="w-fit px-0 text-left text-foreground"
          aria-label={`View details for ${item.header}`}
        >
          {item.header}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>{item.header}</SheetTitle>
          <SheetDescription>Showing total visitors for the last 6 months</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          {!isMobile && item.chartData && item.chartConfig && (
            <>
              <ChartContainer config={item.chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={item.chartData}
                  margin={{ left: 0, right: 10 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  {Object.keys(item.chartConfig).map((key) => (
                    <Area
                      key={key}
                      dataKey={key}
                      type="natural"
                      fill={`var(--color-${key})`}
                      fillOpacity={0.6}
                      stroke={`var(--color-${key})`}
                      stackId="a"
                    />
                  ))}
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just placeholder content to test layout.
                </div>
              </div>
              <Separator />
            </>
          )}

          <form className="flex flex-col gap-4">
            <EditableField
              id="header"
              label="Header"
              initialValue={item.header}
              onSubmit={mockSave}
            />
            <div className="grid grid-cols-2 gap-4">
              <EditableField
                id="type"
                label="Type"
                initialValue={item.type}
                type="select"
                options={sectionTypes}
                onSubmit={mockSave}
              />
              <EditableField
                id="status"
                label="Status"
                initialValue={item.status}
                type="select"
                options={statuses}
                onSubmit={mockSave}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <EditableField
                id="target"
                label="Target"
                initialValue={item.target}
                onSubmit={mockSave}
              />
              <EditableField
                id="limit"
                label="Limit"
                initialValue={item.limit}
                onSubmit={mockSave}
              />
            </div>
            <EditableField
              id="reviewer"
              label="Reviewer"
              initialValue={item.reviewer}
              type="select"
              options={reviewers}
              onSubmit={mockSave}
            />
          </form>
        </div>

        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <Button className="w-full">Submit</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
