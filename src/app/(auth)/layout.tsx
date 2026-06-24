import type { Metadata } from "next";
import { Prompt, Cinzel, Spectral, Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-heading' });
const spectral = Spectral({ subsets: ['latin'], weight: '400', variable: '--font-body' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

export const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap'
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
    <html
      lang="th"
      className={cn(promptFont.className, "font-sans", spectral.variable, cinzel.variable, firaCode.variable)}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
