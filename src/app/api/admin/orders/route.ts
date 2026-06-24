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
    const limit = Number(searchParams.get('limit') || '5');

    const orders = await prisma.orders.findMany({
      take: limit,
      orderBy: {
        id: 'desc'
      },
      include: {
        customers: true
      }
    });

    const total = await prisma.orders.count();

    const formattedOrders = orders.map(order => ({
      id: order.id,
      date: order.date ? order.date.toISOString() : null,
      customerName: order.customers?.name ?? 'ลูกค้าทั่วไป',
      totalAmount: Number(order.total_amount || 0),
      status: order.status
    }));

    return NextResponse.json({
      success: true,
      data: {
        orders: formattedOrders,
        total
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
