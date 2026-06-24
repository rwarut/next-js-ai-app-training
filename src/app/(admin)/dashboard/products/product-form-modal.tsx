/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError
} from "@/components/ui/field";
import { productSchema, type ProductFormValues } from "@/lib/validations/product";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  categories: CategoryOption[];
  product?: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    categoryId: string;
  } | null;
}

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: ""
};

export function ProductFormModal({
  open,
  onClose,
  onSubmit,
  categories,
  product
}: ProductFormModalProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: defaultValues
  });

  // reset form when product or open state changes
  useEffect(() => {
    if (open) {
      if (product) {
        form.reset({
          name: product.name,
          description: product.description ?? "",
          price: product.price,
          categoryId: product.categoryId
        });
      } else {
        form.reset(defaultValues);
      }
    }
  }, [open, product, form]);

  const handleFormSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      await onSubmit(data as ProductFormValues);
    });
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative bg-card border shadow-lg max-w-lg w-full mx-4 rounded-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 p-6 flex flex-col max-h-[90vh]">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{product ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}</h3>
          <p className="text-xs text-muted-foreground mt-1">กรอกข้อมูลรายละเอียดของสินค้าด้านล่าง</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4 overflow-y-auto flex-1 pr-1 py-1">
          {/* Name */}
          <Field>
            <FieldLabel>ชื่อสินค้า</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("name")}
                placeholder="กรอกชื่อสินค้า"
                disabled={isPending}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </FieldContent>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel>รายละเอียดสินค้า</FieldLabel>
            <FieldContent>
              <Textarea
                {...form.register("description")}
                placeholder="กรอกรายละเอียดสินค้า"
                rows={3}
                disabled={isPending}
              />
              <FieldError errors={[form.formState.errors.description]} />
            </FieldContent>
          </Field>

          {/* Price */}
          <Field>
            <FieldLabel>ราคาสินค้า (บาท)</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("price")}
                type="number"
                step="0.01"
                placeholder="0.00"
                disabled={isPending}
              />
              <FieldError errors={[form.formState.errors.price]} />
            </FieldContent>
          </Field>

          {/* Category Dropdown via Controller */}
          <Field>
            <FieldLabel>หมวดหมู่สินค้า</FieldLabel>
            <FieldContent>
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isPending}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>เลือกหมวดหมู่สินค้า</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <FieldError errors={[form.formState.errors.categoryId]} />
            </FieldContent>
          </Field>
        </form>

        <div className="flex justify-end gap-3 border-t pt-4 mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isPending}
          >
            ยกเลิก
          </Button>
          <Button 
            type="submit" 
            onClick={handleFormSubmit}
            disabled={isPending}
            className="gap-2"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {product ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
          </Button>
        </div>
      </div>
    </div>
  );
}
