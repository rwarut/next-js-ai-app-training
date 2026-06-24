import { ContactForm } from './contact-form';
import { Mail, Phone, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <div className="container max-w-6xl py-12 md:py-20">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">ติดต่อเรา</h1>
        <p className="text-muted-foreground mt-2">
          หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่าง
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[5fr_8fr] gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="text-primary w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">อีเมล</span>
                <span className="text-sm text-muted-foreground">contact@example.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="text-primary w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">เบอร์โทรศัพท์</span>
                <span className="text-sm text-muted-foreground">02-xxx-xxxx</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="text-primary w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">เวลาทำการ</span>
                <span className="text-sm text-muted-foreground">จันทร์ - ศุกร์ 09:00 - 18:00</span>
              </div>
            </div>
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            เราพร้อมให้ความช่วยเหลือคุณในทุกขั้นตอน หากคุณมีข้อสงสัยเกี่ยวกับสินค้าหรือบริการของเรา กรุณาส่งข้อความหาเราได้เลย
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
