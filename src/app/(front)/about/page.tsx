import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Lightbulb, Target, Users, ShieldCheck, History } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24">
      {/* Hero Section */}
      <section className="relative z-10 max-w-3xl text-center">
        <Badge
          asChild
          className="rounded-full border-border py-1"
          variant="secondary"
        >
          <Link href="/">
            กลับหน้าหลัก <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mx-auto mt-6 max-w-xl font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem] md:text-6xl/[1.2]">
          ขับเคลื่อนทุกก้าวสู่ความสำเร็จและการเรียนรู้
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl md:text-2xl/normal font-sans">
          ยินดีต้อนรับสู่ ShopVibe พื้นที่ที่ผสมผสานแฟชั่นไลฟ์สไตล์สุดชิคเข้ากับการเรียนรู้ยุคใหม่ 
          เรามุ่งมั่นนำเสนอคอร์สเรียนคุณภาพสูงและสินค้าพรีเมียมเพื่อช่วยให้คุณก้าวสู่เป้าหมายที่ตั้งไว้
        </p>
      </section>

      {/* History & Mission Section */}
      <section className="mt-24 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="rounded-3xl border p-8 md:p-12 bg-card">
          <History className="mb-4 size-10 text-primary animate-pulse" />
          <h2 className="mb-4 text-2xl font-semibold font-heading">ประวัติความเป็นมาของเรา</h2>
          <p className="text-muted-foreground leading-relaxed font-sans">
            ShopVibe เริ่มต้นการเดินทางในปี 2024 จากสตูดิโอเล็กๆ ที่รวมกลุ่มนักออกแบบแฟชั่นและนักพัฒนาซอฟต์แวร์ 
            ที่เชื่อว่า &ldquo;ความมั่นใจภายนอก&rdquo; และ &ldquo;ความรู้ความสามารถภายใน&rdquo; ต้องเดินไปคู่กันในยุคดิจิทัล 
            เราจึงสร้างสรรค์แพลตฟอร์มนี้เพื่อเชื่อมโยงคอลเลกชันเครื่องแต่งกายที่บ่งบอกสไตล์เฉพาะตัว 
            เข้ากับหลักสูตรการเรียนรู้ระดับพรีเมียมจากผู้เชี่ยวชาญตัวจริง เพื่อมอบประสบการณ์ที่เปี่ยมไปด้วยพลังและการเติบโตอย่างรอบด้าน
          </p>
        </div>
        <div className="rounded-3xl border p-8 md:p-12 bg-card">
          <Target className="mb-4 size-10 text-secondary" />
          <h2 className="mb-4 text-2xl font-semibold font-heading">พันธกิจและวิสัยทัศน์</h2>
          <p className="text-muted-foreground leading-relaxed font-sans">
            เรามุ่งส่งเสริมให้ทุกคนสามารถเข้าถึงการเรียนรู้ยุคใหม่และผลิตภัณฑ์ที่มีคุณภาพได้อย่างเท่าเทียมกัน 
            เพื่อเพิ่มพูนความเชี่ยวชาญในสายอาชีพและช่วยให้ทุกคนสามารถปรับตัวเข้ากับโลกที่เปลี่ยนแปลงอย่างรวดเร็ว 
            เรามุ่งมั่นที่จะเป็นจุดหมายปลายทางระดับโลกสำหรับการพัฒนาศักยภาพและการค้นพบสไตล์ที่ใช่สำหรับทุกคน
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mt-24 w-full max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold font-heading">คุณค่าหลักของเรา</h2>
          <p className="mt-4 text-muted-foreground font-sans">หลักการสำคัญที่เป็นเข็มทิศนำทางให้เราสร้างสรรค์บริการที่ดีที่สุด</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Users className="size-6" />,
              title: "ชุมชนต้องมาก่อน",
              description: "เราให้ความสำคัญกับความเห็นของทุกคนในชุมชน และเติบโตไปด้วยกันอย่างยั่งยืน"
            },
            {
              icon: <ShieldCheck className="size-6" />,
              title: "คุณภาพไม่มีข้อลดหย่อน",
              description: "เราใส่ใจและพิถีพิถันในการส่งมอบผลงาน สื่อการเรียนรู้ และสินค้าคุณภาพสูงสุด"
            },
            {
              icon: <Target className="size-6" />,
              title: "มุ่งเน้นผลลัพธ์จริง",
              description: "สิ่งที่เรานำเสนอได้รับการออกแบบมาเพื่อให้เห็นการพัฒนาและความสำเร็จที่ชัดเจน"
            },
            {
              icon: <Lightbulb className="size-6" />,
              title: "นวัตกรรมที่ไม่หยุดนิ่ง",
              description: "เราไม่เคยหยุดนิ่งที่จะปรับเปลี่ยน พัฒนา และค้นหาสิ่งที่ดีที่สุดให้ทันโลกยุคใหม่"
            }
          ].map((value, idx) => (
            <div key={idx} className="rounded-2xl border p-6 bg-card transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 hover:shadow-sm">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
                {value.icon}
              </div>
              <h3 className="mb-2 font-medium font-heading">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-24 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold font-heading">พร้อมที่จะเริ่มต้นการเดินทางของคุณหรือยัง?</h2>
        <p className="mt-4 mb-8 text-muted-foreground max-w-md font-sans">
          สำรวจคอร์สเรียนและสินค้าแฟชั่นพิเศษของเราเพื่อช่วยส่งเสริมทักษะและกำหนดสไตล์ของคุณให้โดดเด่นยิ่งขึ้น
        </p>
        <div className="flex gap-4">
          <Button asChild className="rounded-full bg-primary hover:bg-primary/95 text-white" size="lg">
            <Link href="/course">สำรวจคอร์สเรียน <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button asChild className="rounded-full shadow-none border-primary text-primary hover:bg-primary/5" size="lg" variant="outline">
            <Link href="/product">ช้อปสินค้าออนไลน์ <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
