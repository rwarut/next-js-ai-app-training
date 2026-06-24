import { Suspense } from "react";
import type { Metadata } from "next";
import { Cinzel, Spectral, Fira_Code } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-heading' });
const spectral = Spectral({ subsets: ['latin'], weight: '400', variable: '--font-body' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "ระบบ E-Commerce",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`font-sans ${spectral.variable} ${cinzel.variable} ${firaCode.variable}`}>
      <body>
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
