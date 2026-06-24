import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";
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
    const search = searchParams.get('search') || '';
    const page = Number(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } }
      ]
    } : {};

    const products = await prisma.products.findMany({
      where,
      skip,
      take: limit,
      include: {
        categories: true
      },
      orderBy: {
        id: 'desc'
      }
    });

    const total = await prisma.products.count({ where });

    const formattedProducts = products.map(product => ({
      id: String(product.id),
      name: product.name ?? '',
      description: product.description ?? '',
      price: Number(product.price || 0),
      categoryId: product.category_id ? String(product.category_id) : '',
      categoryName: product.categories?.name ?? 'ไม่ระบุหมวดหมู่'
    }));

    return NextResponse.json({
      success: true,
      data: {
        products: formattedProducts,
        total
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error.issues[0].message
      }, { status: 400 });
    }

    const { name, description, price, categoryId } = result.data;

    const newProduct = await prisma.products.create({
      data: {
        name,
        description: description || null,
        price,
        category_id: Number(categoryId)
      }
    });

    return NextResponse.json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
