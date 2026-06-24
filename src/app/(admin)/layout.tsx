import type { Metadata } from "next";
import { Poppins, Nunito, Space_Mono, Prompt } from "next/font/google";
import "../globals.css";
import { AdminSidebar } from "./admin-sidebar";
import { AdminGuard } from "./admin-guard";
import { Suspense } from "react";

const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunito = Nunito({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body-latin",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const prompt = Prompt({
  weight: ["400", "500", "700"],
  subsets: ["thai"],
  variable: "--font-body-thai",
  display: "swap",
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
    <html lang="th" className={`${poppins.variable} ${nunito.variable} ${spaceMono.variable} ${prompt.variable} font-sans`}>
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
