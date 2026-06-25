/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ArrowLeft,
  Package,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ProductFormModal } from "./product-form-modal";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import type { ProductFormValues } from "@/lib/validations/product";

type AdminProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string;
  categoryName: string;
};

type CategoryOption = {
  id: string;
  name: string;
};

const priceFormatter = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0
});

export default function ProductsClient() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const result = await res.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch {
      console.error("Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?search=${encodeURIComponent(search)}&page=${page}`);
      const result = await res.json();
      if (result.success) {
        setProducts(result.data.products);
        setTotal(result.data.total);
      } else {
        toast.error(result.error || "เกิดข้อผิดพลาดในการโหลดสินค้า");
      }
    } catch {
      toast.error("ไม่สามารถเชื่อมต่อข้อมูลสินค้าได้");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(inputVal);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [inputVal]);

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = async (values: ProductFormValues) => {
    try {
      let url = "/api/admin/products";
      let method = "POST";

      if (editProduct) {
        url = `/api/admin/products/${editProduct.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const result = await res.json();

      if (result.success) {
        toast.success(editProduct ? "แก้ไขสินค้าเรียบร้อยแล้ว" : "เพิ่มสินค้าใหม่เรียบร้อยแล้ว");
        setFormOpen(false);
        setEditProduct(null);
        fetchProducts();
      } else {
        toast.error(result.error || "เกิดข้อผิดพลาดในการบันทึกสินค้า");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, {
        method: "DELETE"
      });
      const result = await res.json();

      if (result.success) {
        toast.success("ลบสินค้าเรียบร้อยแล้ว");
        setDeleteTarget(null);
        fetchProducts();
      } else {
        toast.error(result.error || "ไม่สามารถลบสินค้าได้");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(total / 10) || 1;

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              จัดการสินค้า
            </h1>
            <p className="text-muted-foreground mt-1">
              เพิ่ม ลบ แก้ไข และค้นหารายการสินค้าในระบบทั้งหมด
            </p>
          </div>
        </div>
        <Button 
          onClick={() => {
            setEditProduct(null);
            setFormOpen(true);
          }}
          className="gap-2 sm:self-end"
        >
          <Plus className="h-4 w-4" />
          เพิ่มสินค้าใหม่
        </Button>
      </div>

      {/* Search Input */}
      <div className="flex items-center max-w-sm relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="ค้นหาสินค้าจากชื่อหรือคำอธิบาย..."
          className="pl-9"
        />
      </div>

      {/* Products Table Card */}
      <Card className="bg-card/40 backdrop-blur-sm border shadow-sm">
        <div className="p-0">
          {loading ? (
            <div className="space-y-4 p-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded-md w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground flex flex-col items-center gap-3">
              <Package className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg">ไม่พบข้อมูลสินค้าที่ค้นหา</p>
              <p className="text-sm">ลองเปลี่ยนคำค้นหาหรือเพิ่มสินค้าใหม่ในระบบ</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[100px] font-semibold">รหัสสินค้า</TableHead>
                  <TableHead className="font-semibold">ชื่อสินค้า</TableHead>
                  <TableHead className="font-semibold">หมวดหมู่</TableHead>
                  <TableHead className="font-semibold">ราคา</TableHead>
                  <TableHead className="font-semibold text-right">จัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">#{product.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{product.name}</div>
                      {product.description && (
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                          {product.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{product.categoryName}</TableCell>
                    <TableCell className="font-semibold">
                      {priceFormatter.format(product.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditProduct(product);
                            setFormOpen(true);
                          }}
                          className="h-8 w-8 hover:text-primary"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(product)}
                          className="h-8 w-8 hover:text-destructive text-muted-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">
            แสดงหน้า {page} จาก {totalPages} หน้า (ทั้งหมด {total} รายการ)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      <ProductFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditProduct(null);
        }}
        onSubmit={handleFormSubmit}
        categories={categories}
        product={editProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        productName={deleteTarget?.name ?? ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
