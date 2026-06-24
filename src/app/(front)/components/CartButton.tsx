"use client"

import { Button } from "@/components/ui/button";
import type { ProductCardItem } from "@/components/features-product";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag } from "lucide-react";

type Props = {
  product: ProductCardItem;
};

export default function CartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);   

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: String(product.id),
      name: product.name,
      price: product.price,
      qty: 1
    });   
  }

  return (
    <Button 
      size="sm" 
      onClick={handleAddItem}
      className="gap-2 shadow-sm rounded-full"
    >
      <ShoppingBag className="size-4" />
      <span>หยิบใส่ตะกร้า</span>
    </Button>
  );
}
