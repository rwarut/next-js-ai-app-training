import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm font-medium animate-pulse">กำลังเข้าสู่ระบบจัดการหลังบ้าน...</p>
    </div>
  );
}
