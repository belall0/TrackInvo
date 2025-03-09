'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Revenue',
    color: '#64B5F6 ',
  },
} satisfies ChartConfig;

interface RevenueBarChartProps {
  data: { month: string; revenue: number }[];
}
const RevenueBarChart = ({ data }: RevenueBarChartProps) => {
  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickMargin={10} tickLine={false} axisLine={false} />
          <YAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="#64B5F6" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueBarChart;
