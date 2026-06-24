import { ContactForm } from './contact-form';
import { Mail, Phone, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#1A0F0A] text-[#F5E6D3] font-serif">
      <div className="container max-w-6xl py-12 md:py-20 mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-[#CA8A04] uppercase tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
            ติดต่อเรา
          </h1>
          <p className="text-[#BFA98A] mt-2 text-lg" style={{ fontFamily: 'Spectral, serif' }}>
            หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่าง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
          <div className="flex flex-col gap-6">
            <div className="bg-[#2C1A10] border border-[#5C3D2E] p-6 rounded-sm shadow-[2px_8px_0px_0px_rgba(202,138,4,0.2)]">
              <div className="border-t-2 border-[#CA8A04] -mt-6 pt-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#CA8A04]/10 p-2 rounded-full border border-[#CA8A04]/30">
                    <Mail className="text-[#CA8A04] w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#CA8A04]" style={{ fontFamily: 'Cinzel, serif' }}>อีเมล</span>
                    <span className="text-sm text-[#BFA98A]" style={{ fontFamily: 'Spectral, serif' }}>contact@example.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#CA8A04]/10 p-2 rounded-full border border-[#CA8A04]/30">
                    <Phone className="text-[#CA8A04] w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#CA8A04]" style={{ fontFamily: 'Cinzel, serif' }}>เบอร์โทรศัพท์</span>
                    <span className="text-sm text-[#BFA98A]" style={{ fontFamily: 'Spectral, serif' }}>02-xxx-xxxx</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#CA8A04]/10 p-2 rounded-full border border-[#CA8A04]/30">
                    <Clock className="text-[#CA8A04] w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#CA8A04]" style={{ fontFamily: 'Cinzel, serif' }}>เวลาทำการ</span>
                    <span className="text-sm text-[#BFA98A]" style={{ fontFamily: 'Spectral, serif' }}>จันทร์ - ศุกร์ 09:00 - 18:00</span>
                  </div>
                </div>
              </div>
              <Separator className="my-6 bg-[#5C3D2E]" />
              <p className="text-sm text-[#BFA98A] italic leading-relaxed" style={{ fontFamily: 'Spectral, serif' }}>
                เราพร้อมให้ความช่วยเหลือคุณในทุกขั้นตอน หากคุณมีข้อสงสัยเกี่ยวกับสินค้าหรือบริการของเรา กรุณาส่งข้อความหาเราได้เลย
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

