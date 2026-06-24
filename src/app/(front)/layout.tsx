import { Suspense } from "react";
import type { Metadata } from "next";
import { Poppins, Nunito, Space_Mono, Prompt } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

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
  title: "ระบบ E-Commerce",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${poppins.variable} ${nunito.variable} ${spaceMono.variable} ${prompt.variable} font-sans`}>
      <body>
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
