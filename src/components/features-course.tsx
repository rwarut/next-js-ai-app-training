import Image from "next/image";
import type { Course } from "@/lib/services/course";

type Props = {
  courses: Course[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col px-6 py-14 sm:py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-heading text-4xl font-extrabold tracking-[0.01em] sm:text-5xl text-foreground">
          หลักสูตรทั้งหมด
        </h2>
        <p className="font-sans text-muted-foreground text-[16px]">
          ยกระดับทักษะการเรียนรู้ด้วยคอร์สเรียนคุณภาพสูงที่ได้รับการออกแบบมาอย่างประณีต
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article 
            className="group flex flex-col overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white transition-all duration-300 hover:shadow-product-hover hover:-translate-y-1 hover:border-[#D4D4D4]" 
            key={course.title}
          >
            {/* Image container - Flush at top */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
              <Image
                alt={course.title}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={500}
                height={625}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={course.picture}
                loading="eager"
              />
            </div>
            
            {/* Content Container */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
                {course.title}
              </h3>
              <p className="mt-2 line-clamp-3 font-sans text-sm text-[#525252] leading-relaxed">
                {course.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesCourse;
