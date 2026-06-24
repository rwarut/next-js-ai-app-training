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
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="text-primary w-12 h-12" />
        <div className="space-y-2">
          <h3 className="text-xl font-bold">ส่งข้อความสำเร็จ!</h3>
          <p className="text-muted-foreground">
            เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Field>
        <FieldLabel>ชื่อ</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("name")} 
            placeholder="กรอกชื่อของคุณ" 
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.name]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>อีเมล</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("email")} 
            type="email" 
            placeholder="example@email.com" 
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.email]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>ข้อความ</FieldLabel>
        <FieldContent>
          <Textarea 
            {...form.register("message")} 
            rows={5} 
            placeholder="พิมพ์ข้อความที่ต้องการ..." 
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.message]} />
        </FieldContent>
      </Field>

       <Button 
         type="submit" 
         className="w-full" 
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
