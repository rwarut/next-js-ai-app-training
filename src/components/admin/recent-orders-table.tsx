import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type AdminOrderItem = {
  id: number;
  date: string | null;
  customerName: string;
  totalAmount: number;
  status: string | null;
};

interface RecentOrdersTableProps {
  orders: AdminOrderItem[];
  loading: boolean;
}

export function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  const priceFormatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  });

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-none hover:bg-emerald-500/20">จัดส่งแล้ว</Badge>;
      case 'received':
        return <Badge className="bg-sky-500/10 text-sky-500 border border-sky-500/20 shadow-none hover:bg-sky-500/20">รับสินค้าแล้ว</Badge>;
      case 'processing':
        return <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-none hover:bg-amber-500/20 animate-pulse">กำลังดำเนินการ</Badge>;
      default:
        return <Badge variant="secondary">ไม่ระบุสถานะ</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded-md w-full" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg text-muted-foreground">
        ไม่มีรายการสั่งซื้อล่าสุด
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[100px] font-semibold">เลขออเดอร์</TableHead>
            <TableHead className="font-semibold">ลูกค้า</TableHead>
            <TableHead className="font-semibold">วันที่สั่งซื้อ</TableHead>
            <TableHead className="font-semibold">ยอดรวม</TableHead>
            <TableHead className="font-semibold text-right">สถานะ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/10 transition-colors">
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                {order.date ? new Date(order.date).toLocaleDateString('th-TH') : '-'}
              </TableCell>
              <TableCell className="font-semibold">
                {priceFormatter.format(order.totalAmount)}
              </TableCell>
              <TableCell className="text-right">
                {getStatusBadge(order.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
