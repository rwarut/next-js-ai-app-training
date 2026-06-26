import type { Metadata } from "next";
import { Poppins, Nunito, Space_Mono, Prompt } from "next/font/google";
import "../globals.css";

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
  title: "ระบบ ล็อกอิน",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="th" className={`${poppins.variable} ${nunito.variable} ${spaceMono.variable} ${prompt.variable} font-sans`}>
      <body>
        {children}
      </body>
    </html>
  );
}
