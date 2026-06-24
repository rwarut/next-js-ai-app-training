import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const salesAgg = await prisma.orders.aggregate({
      _sum: {
        total_amount: true
      },
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    const todayOrders = await prisma.orders.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    const pendingOrders = await prisma.orders.count({
      where: {
        status: 'processing'
      }
    });

    const totalProducts = await prisma.products.count();
    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      success: true,
      data: {
        todaySales: Number(salesAgg._sum.total_amount || 0),
        todayOrders,
        pendingOrders,
        totalProducts,
        totalUsers
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
