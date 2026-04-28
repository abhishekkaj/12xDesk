"use client";

import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell
} from "recharts";
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Leads",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const STAGE_COLORS: Record<string, string> = {
  "NEW LEAD": "var(--blue-electric)",
  "REQUIREMENT GATHERED": "var(--violet-500)",
  "SITE VISIT SCHEDULED": "var(--amber-warm)",
  "SITE VISIT DONE": "var(--emerald-glow)",
  "TOKEN NEGOTIATION": "var(--orange-500)",
  "CLOSED WON": "var(--emerald-500)",
  "CLOSED LOST": "var(--rose-alert)",
};

export function PipelineChart({ data }: { data: { stage: string; count: number }[] }) {
  // Ensure the chart follows the correct pipeline order
  const ORDER = [
    "NEW LEAD",
    "REQUIREMENT GATHERED",
    "SITE VISIT SCHEDULED",
    "SITE VISIT DONE",
    "TOKEN NEGOTIATION",
    "CLOSED WON",
    "CLOSED LOST"
  ];

  const sortedData = data.sort((a, b) => {
    return ORDER.indexOf(a.stage) - ORDER.indexOf(b.stage);
  });

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="stage" 
            stroke="#888888" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => value.split(" ").map((word: string) => word[0]).join("")}
          />
          <YAxis 
            stroke="#888888" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar 
            dataKey="count" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
          >
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={STAGE_COLORS[entry.stage] || "hsl(var(--primary))"} 
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
