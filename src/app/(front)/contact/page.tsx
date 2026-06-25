import { ContactForm } from './contact-form';
import { Mail, Phone, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 md:py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            ติดต่อเรา
          </h1>
          <p className="font-sans text-muted-foreground mt-3 text-lg leading-relaxed">
            หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่าง ทีมงานพร้อมช่วยเหลือคุณเสมอ
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
          
          {/* Info Card Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#E5E5E5] p-8 rounded-[16px] shadow-medium transition-all duration-200 hover:shadow-large">
              <h2 className="font-heading text-xl font-bold mb-6 text-foreground border-b pb-4 border-[#E5E5E5]">
                ข้อมูลการติดต่อ
              </h2>
              
              <div className="space-y-6">
                {/* Email Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-[#22D3EE]/10 p-3 rounded-full border border-[#22D3EE]/30 flex items-center justify-center shrink-0">
                    <Mail className="text-secondary w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[13px] font-bold text-foreground">อีเมล</span>
                    <span className="font-sans text-sm text-[#525252]">contact@example.com</span>
                  </div>
                </div>

                {/* Phone Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-[#22D3EE]/10 p-3 rounded-full border border-[#22D3EE]/30 flex items-center justify-center shrink-0">
                    <Phone className="text-secondary w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[13px] font-bold text-foreground">เบอร์โทรศัพท์</span>
                    <span className="font-sans text-sm text-[#525252]">02-xxx-xxxx</span>
                  </div>
                </div>

                {/* Business Hours Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-[#22D3EE]/10 p-3 rounded-full border border-[#22D3EE]/30 flex items-center justify-center shrink-0">
                    <Clock className="text-secondary w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[13px] font-bold text-foreground">เวลาทำการ</span>
                    <span className="font-sans text-sm text-[#525252]">จันทร์ - ศุกร์ 09:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-[#E5E5E5]" />
              
              <p className="font-sans text-sm text-[#525252] leading-relaxed italic">
                เราพร้อมให้ความช่วยเหลือคุณในทุกขั้นตอน หากคุณมีข้อสงสัยเกี่ยวกับสินค้าหรือบริการของเรา กรุณาส่งข้อความหาเราได้เลย
              </p>
            </div>
          </div>

          {/* Form Column */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
