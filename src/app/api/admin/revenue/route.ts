import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

    const orders = await prisma.orders.findMany({
      where: {
        date: {
          gte: startDate
        }
      },
      select: {
        date: true,
        total_amount: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    const revenueMap = new Map<string, { revenue: number, orders: number }>();

    for (let i = 0; i < days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const label = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      revenueMap.set(label, { revenue: 0, orders: 0 });
    }

    orders.forEach(order => {
      if (!order.date) return;
      const d = new Date(order.date);
      const label = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (revenueMap.has(label)) {
        const current = revenueMap.get(label)!;
        revenueMap.set(label, {
          revenue: current.revenue + Number(order.total_amount || 0),
          orders: current.orders + 1
        });
      }
    });

    const data = Array.from(revenueMap.entries()).map(([date, val]) => ({
      date,
      revenue: val.revenue,
      orders: val.orders
    }));

    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
