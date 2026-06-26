import { AdminGuard } from "../admin-guard";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div className="p-8 flex items-center justify-center h-full text-muted-foreground">กำลังตรวจสอบสิทธิ์...</div>}>
      <AdminGuard>
        {children}
      </AdminGuard>
    </Suspense>
  );
}
