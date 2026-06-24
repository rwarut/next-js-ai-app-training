"use client"

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { 
  Field, 
  FieldContent, 
  FieldLabel, 
  FieldError 
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error);
        }

        toast.success("ส่งข้อความเรียบร้อยแล้ว");
        setIsSuccess(true);
        form.reset();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
        toast.error(errorMessage);
      }
    });
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8 bg-[#2C1A10] border border-[#5C3D2E] rounded-sm shadow-[2px_8px_0px_0px_rgba(202,138,4,0.2)] p-8">
        <CheckCircle className="text-[#CA8A04] w-12 h-12" />
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#F5E6D3]" style={{ fontFamily: 'Cinzel, serif' }}>ส่งข้อความสำเร็จ!</h3>
          <p className="text-[#BFA98A]">
            เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="mt-4 border-[#CA8A04] text-[#CA8A04] hover:bg-[#CA8A04]/10"
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-[#2C1A10] border border-[#5C3D2E] p-8 rounded-sm shadow-[2px_8px_0px_0px_rgba(202,138,4,0.2)]">
      <div className="border-t-2 border-[#CA8A04] -mt-8 pt-8 mb-6">
        <h3 className="text-lg font-semibold text-[#CA8A04] uppercase tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>ส่งข้อความหาเรา</h3>
      </div>
      
      <Field>
        <FieldLabel className="text-[#CA8A04] font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>ชื่อ</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("name")} 
            placeholder="กรอกชื่อของคุณ" 
            className="w-full bg-[#1A0F0A] border-[#5C3D2E] text-[#F5E6D3] placeholder:text-[#BFA98A]/50 focus:border-[#CA8A04] focus:ring-[#CA8A04]/25"
          />
          <FieldError errors={[form.formState.errors.name]} className="text-[#991B1B]" />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel className="text-[#CA8A04] font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>อีเมล</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("email")} 
            type="email" 
            placeholder="example@email.com" 
            className="w-full bg-[#1A0F0A] border-[#5C3D2E] text-[#F5E6D3] placeholder:text-[#BFA98A]/50 focus:border-[#CA8A04] focus:ring-[#CA8A04]/25"
          />
          <FieldError errors={[form.formState.errors.email]} className="text-[#991B1B]" />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel className="text-[#CA8A04] font-semibold" style={{ fontFamily: 'Cinzel, serif' }}>ข้อความ</FieldLabel>
        <FieldContent>
          <Textarea 
            {...form.register("message")} 
            rows={5} 
            placeholder="พิมพ์ข้อความที่ต้องการ..." 
            className="w-full bg-[#1A0F0A] border-[#5C3D2E] text-[#F5E6D3] placeholder:text-[#BFA98A]/50 focus:border-[#CA8A04] focus:ring-[#CA8A04]/25"
          />
          <FieldError errors={[form.formState.errors.message]} className="text-[#991B1B]" />
        </FieldContent>
      </Field>

      <Button 
        type="submit" 
        className="w-full bg-[#CA8A04] text-[#1A0F0A] font-bold border border-[#DAA520] hover:bg-[#B8780A] shadow-[1px_3px_0px_0px_rgba(202,138,4,0.15)]" 
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            กำลังส่ง...
          </>
        ) : (
          "ส่งข้อความ"
        )}
      </Button>
    </form>
  );
}
