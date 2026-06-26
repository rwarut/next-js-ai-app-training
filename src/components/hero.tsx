import { ArrowUpRight, CirclePlay, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background px-6">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
      
      <div className="relative z-10 max-w-4xl text-center">
        <Badge
          asChild
          className="rounded-[4px] border-secondary border px-3 py-1 font-sans text-xs uppercase tracking-widest text-[#083344] bg-[#22D3EE]/10"
          variant="secondary"
        >
          <Link href="/product" className="inline-flex items-center gap-1.5 font-bold">
            <Sparkles className="size-3.5 text-secondary animate-pulse" />
            ยินดีต้อนรับสู่คอลเลกชันใหม่ล่าสุด! <ArrowUpRight className="size-3.5" />
          </Link>
        </Badge>

        <h1 className="mx-auto mt-8 font-heading text-5xl font-extrabold tracking-[0.02em] leading-[1.1] sm:text-6xl md:text-7xl">
          ค้นพบตัวตนที่แท้จริง <span className="text-primary">กำหนดสไตล์</span> ในแบบคุณ
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground md:text-[18px] leading-relaxed">
          ยินดีต้อนรับสู่ ShopVibe พื้นที่ช้อปปิ้งออนไลน์ที่ผสานรวมแฟชั่นระดับพรีเมียมเข้ากับคอร์สเรียนยุคดิจิทัล 
          เพื่อยกระดับไลฟ์สไตล์และความรู้ของคุณอย่างลงตัว มอบประสบการณ์การใช้งานที่ลื่นไหล ทันสมัย และตอบโจทย์ทุกการช้อปของคุณ
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/95 text-white">
            <Link href="/product" className="inline-flex items-center">
              สำรวจร้านค้า <ArrowUpRight className="ml-1 size-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 shadow-none"
          >
            <Link href="/course" className="inline-flex items-center">
              คอร์สเรียนของเรา <CirclePlay className="mr-2 size-5 text-primary" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
