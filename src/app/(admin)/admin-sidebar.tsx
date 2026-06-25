"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, Home, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "แดชบอร์ด",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "จัดการสินค้า",
    href: "/dashboard/products",
    icon: Package,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        }
      }
    });
  };

  return (
    <aside className="w-64 border-r bg-card/60 backdrop-blur-md flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 border-b flex items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-wider">
          <span className="text-primary font-serif">SKILL</span>
          <span className="text-muted-foreground text-xs uppercase tracking-widest border px-1.5 py-0.5 rounded">Admin</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2 bg-muted/20">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>กลับหน้าหลักร้านค้า</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>ออกจากระบบ</span>
        </Button>
      </div>
    </aside>
  );
}
