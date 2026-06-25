/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card";
import { PeriodSelector } from "@/components/admin/period-selector";
import { RecentOrdersTable, type AdminOrderItem } from "@/components/admin/recent-orders-table";
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Package, 
  Users, 
  RefreshCw,
  LayoutDashboard
} from "lucide-react";
import type { RevenuePoint } from "@/components/admin/revenue-chart";

const RevenueChart = dynamic(() => import("@/components/admin/revenue-chart"), { ssr: false });

type AdminStats = {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalUsers: number;
};

const priceFormatter = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0
});

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const fetchStats = async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await fetch("/api/admin/stats");
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setStats(result.data);
    } catch (err: any) {
      setStatsError(err.message || "ไม่สามารถโหลดข้อมูลสถิติได้");
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const res = await fetch("/api/admin/orders?limit=5");
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setOrders(result.data.orders);
    } catch (err: any) {
      setOrdersError(err.message || "ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchRevenue = async () => {
    setRevenueLoading(true);
    setRevenueError(null);
    try {
      const res = await fetch(`/api/admin/revenue?period=${period}`);
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setRevenue(result.data);
    } catch (err: any) {
      setRevenueError(err.message || "ไม่สามารถโหลดข้อมูลรายได้ได้");
    } finally {
      setRevenueLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchOrders();

    const interval = setInterval(() => {
      fetchStats();
      fetchOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchRevenue();
  }, [period]);

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            ระบบจัดการหลังบ้าน
          </h1>
          <p className="text-muted-foreground mt-1">
            ดูภาพรวมการเติบโต ยอดขาย และสินค้าทั้งหมดของร้านค้า
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/dashboard/products">
              <Package className="mr-2 h-4 w-4" />
              จัดการสินค้า
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              fetchStats();
              fetchOrders();
              fetchRevenue();
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div>
        {statsError ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive flex flex-col items-center gap-3">
            <p>{statsError}</p>
            <Button size="sm" onClick={fetchStats}>ลองใหม่</Button>
          </div>
        ) : statsLoading && !stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <KpiCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard
              title="ยอดขายวันนี้"
              value={priceFormatter.format(stats?.todaySales || 0)}
              icon={<DollarSign className="h-4 w-4" />}
              description="ยอดรวมธุรกรรมที่สั่งซื้อวันนี้"
            />
            <KpiCard
              title="ออเดอร์วันนี้"
              value={stats?.todayOrders || 0}
              icon={<ShoppingBag className="h-4 w-4" />}
              description="จำนวนคำสั่งซื้อใหม่ในวันนี้"
            />
            <KpiCard
              title="ออเดอร์รอดำเนินการ"
              value={stats?.pendingOrders || 0}
              icon={<Clock className="h-4 w-4" />}
              description="จำนวนสินค้าที่รอการจัดส่ง"
            />
            <KpiCard
              title="สินค้าทั้งหมด"
              value={stats?.totalProducts || 0}
              icon={<Package className="h-4 w-4" />}
              description="จำนวนประเภทสินค้าในระบบ"
            />
            <KpiCard
              title="ผู้ใช้งานทั้งหมด"
              value={stats?.totalUsers || 0}
              icon={<Users className="h-4 w-4" />}
              description="ผู้ใช้ที่ลงทะเบียนในระบบ"
            />
          </div>
        )}
      </div>

      {/* Charts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Chart Section */}
        <Card className="lg:col-span-8 bg-card/40 backdrop-blur-sm border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
            <div>
              <CardTitle className="text-lg font-bold">สถิติยอดขาย</CardTitle>
              <CardDescription>กราฟเปรียบเทียบยอดขายรวมตามช่วงเวลาที่กำหนด</CardDescription>
            </div>
            <PeriodSelector value={period} onChange={setPeriod} />
          </CardHeader>
          <CardContent>
            {revenueError ? (
              <div className="h-[300px] flex flex-col items-center justify-center gap-3 border border-dashed rounded-lg text-destructive">
                <p>{revenueError}</p>
                <Button size="sm" onClick={fetchRevenue}>ลองใหม่</Button>
              </div>
            ) : (
              <RevenueChart data={revenue} loading={revenueLoading} />
            )}
          </CardContent>
        </Card>

        {/* Recent Orders Section */}
        <Card className="lg:col-span-4 bg-card/40 backdrop-blur-sm border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">รายการสั่งซื้อล่าสุด</CardTitle>
            <CardDescription>แสดงรายการคำสั่งซื้อ 5 รายการล่าสุดในระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersError ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 border border-dashed rounded-lg text-destructive">
                <p>{ordersError}</p>
                <Button size="sm" onClick={fetchOrders}>ลองใหม่</Button>
              </div>
            ) : (
              <RecentOrdersTable orders={orders} loading={ordersLoading} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
