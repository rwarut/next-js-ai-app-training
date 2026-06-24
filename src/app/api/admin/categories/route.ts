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
    const categories = await prisma.categories.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    const formattedCategories = categories.map(category => ({
      id: String(category.id),
      name: category.name ?? 'ไม่ระบุชื่อหมวดหมู่'
    }));

    return NextResponse.json({
      success: true,
      data: formattedCategories
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
