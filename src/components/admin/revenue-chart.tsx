/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export type RevenuePoint = {
  date: string;
  revenue: number;
  orders: number;
};

interface RevenueChartProps {
  data: RevenuePoint[];
  loading: boolean;
}

export default function RevenueChart({ data, loading }: RevenueChartProps) {
  const priceFormatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  });

  if (loading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-card/50 border rounded-lg animate-pulse">
        <span className="text-muted-foreground text-sm">กำลังโหลดข้อมูลแผนภูมิ...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-card/50 border rounded-lg">
        <span className="text-muted-foreground text-sm">ไม่มีข้อมูลการขายในโปรแกรมนี้</span>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.4)" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "0 4px 12px hsl(var(--foreground) / 0.05)"
            }}
            labelStyle={{ fontWeight: "bold" }}
            formatter={((value: any, name: any) => [
              name === "revenue" ? priceFormatter.format(Number(value)) : `${value} รายการ`,
              name === "revenue" ? "ยอดขาย" : "จำนวนออเดอร์"
            ]) as any}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            activeDot={{ r: 8, strokeWidth: 0 }}
            dot={false}
            name="revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
