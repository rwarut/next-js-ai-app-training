import type { Metadata } from "next";
import { Prompt, Cinzel, Spectral, Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import { AdminSidebar } from "./admin-sidebar";
import { AdminGuard } from "./admin-guard";
import { Suspense } from "react";

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-heading' });
const spectral = Spectral({ subsets: ['latin'], weight: '400', variable: '--font-body' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "ระบบจัดการหลังบ้าน | SKILL Admin",
  description: "จัดการร้านค้า e-commerce",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(promptFont.className, "font-sans", spectral.variable, cinzel.variable, firaCode.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased flex">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto h-screen bg-muted/10">
          <Suspense fallback={<div className="p-8 flex items-center justify-center h-full text-muted-foreground">กำลังตรวจสอบสิทธิ์...</div>}>
            <AdminGuard>
              {children}
            </AdminGuard>
          </Suspense>
        </main>
      </body>
    </html>
  );
}
