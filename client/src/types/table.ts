import { z } from "zod";

const chartTheme = z.object({
  light: z.string(),
  dark: z.string(),
});

const chartConfigValue = z.object({
  label: z.string().optional(), // or z.any() if ReactNode
  icon: z.any().optional(),     // or z.function() if known
}).and(
  z.union([
    z.object({ color: z.string().optional(), theme: z.undefined().optional() }),
    z.object({ color: z.undefined().optional(), theme: chartTheme }),
  ])
);

export const tableSchema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.number(), // updated per previous suggestion
  limit: z.number(),
  reviewer: z.string(),
  chartData: z
    .array(z.record(z.union([z.string(), z.number()])))
    .optional(),
  chartConfig: z.record(chartConfigValue).optional(), // ✅ THIS IS THE FIX
});

export type TableSchema = z.infer<typeof tableSchema>;
