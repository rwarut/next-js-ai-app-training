import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error.issues[0].message
      }, { status: 400 });
    }

    const { name, description, price, categoryId } = result.data;

    const updatedProduct = await prisma.products.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        description: description || null,
        price,
        category_id: Number(categoryId)
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const productId = Number(id);

    // Delete Guard: check if the product has items in existing orders
    const count = await prisma.order_items.count({
      where: {
        product_id: productId
      }
    });

    if (count > 0) {
      return NextResponse.json({
        success: false,
        error: `ไม่สามารถลบสินค้านี้ได้เนื่องจากมีรายการสั่งซื้ออยู่แล้วจำนวน ${count} รายการ`
      }, { status: 409 });
    }

    await prisma.products.delete({
      where: {
        id: productId
      }
    });

    return NextResponse.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
