import Hero from "@/components/hero";
import { ShoppingBag, BookOpen, Zap, Sparkles } from "lucide-react";

// http://localhost:3000/
export default function Home() {
  const highlights = [
    {
      icon: <ShoppingBag className="size-8 text-primary" />,
      title: "แฟชั่นและไลฟ์สไตล์ชิคระดับพรีเมียม",
      description: "คัดสรรเสื้อผ้า คอลเลกชันใหม่ และสินค้าไลฟ์สไตล์ที่จะช่วยให้คุณค้นพบสไตล์ที่โดดเด่นและเป็นตัวตนของคุณอย่างแท้จริง"
    },
    {
      icon: <BookOpen className="size-8 text-[#22D3EE]" />, // secondary cyan
      title: "คอร์สเรียนยุคใหม่เพื่อความก้าวหน้า",
      description: "พัฒนาทักษะดิจิทัลและอาชีพของคุณผ่านหลักสูตรออนไลน์ระดับพรีเมียมที่สอนโดยผู้เชี่ยวชาญในสายงานตัวจริง"
    },
    {
      icon: <Zap className="size-8 text-[#FACC15]" />, // tertiary yellow
      title: "ประสบการณ์การช้อปปิ้งที่ลื่นไหล",
      description: "ระบบช้อปปิ้งที่ใช้งานง่าย การจัดการตะกร้าสินค้าที่รวดเร็วทันใจ ปลอดภัย และแสดงราคาชัดเจนไร้ค่าธรรมเนียมแอบแฝง"
    }
  ];

  return (
    <div>
      <Hero />

      {/* จุดเด่นของเว็บไซต์ (Highlights Section) */}
      <section className="bg-muted/10 py-20 px-6 border-t">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4 font-sans uppercase tracking-wider">
              <Sparkles className="size-3 text-primary animate-pulse" />
              จุดเด่นของเรา
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              ทำไมต้องเลือกช้อปและเรียนรู้กับ <span className="text-primary font-extrabold">ShopVibe</span>?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-sans text-lg">
              เราผสมผสานสิ่งที่ดีที่สุดสำหรับไลฟ์สไตล์และการเติบโตทางวิชาชีพของคุณในแพลตฟอร์มเดียวที่สะดวกและตอบโจทย์ที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-primary/20"
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-muted/50 p-3">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-sans text-[15px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
