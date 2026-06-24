import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Lightbulb, Target, Users, ShieldCheck } from "lucide-react";

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
            Back to Home <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mx-auto mt-6 max-w-xl font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem] md:text-6xl/[1.2]">
          Empowering Your Journey to Mastery
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl md:text-2xl/normal">
          We are dedicated to providing high-quality educational resources and a 
          seamless shopping experience to help you achieve your professional goals.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mt-24 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="rounded-3xl border p-8 md:p-12">
          <Target className="mb-4 size-10 text-primary" />
          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To democratize access to expert-led education and premium tools, 
            ensuring that everyone has the opportunity to learn, grow, and succeed 
            in an ever-evolving digital landscape.
          </p>
        </div>
        <div className="rounded-3xl border p-8 md:p-12">
          <Lightbulb className="mb-4 size-10 text-primary" />
          <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            To be the global leader in skill-based learning, recognized for 
            innovation, quality, and a relentless commitment to student success.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mt-24 w-full max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Our Core Values</h2>
          <p className="mt-4 text-muted-foreground">The principles that guide everything we do.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Users className="size-6" />,
              title: "Community First",
              description: "We build for the community and grow with the community."
            },
            {
              icon: <ShieldCheck className="size-6" />,
              title: "Uncompromising Quality",
              description: "We believe in delivering excellence in every piece of content."
            },
            {
              icon: <Target className="size-6" />,
              title: "Result-Driven",
              description: "Our focus is always on the tangible outcomes for our learners."
            },
            {
              icon: <Lightbulb className="size-6" />,
              title: "Continuous Innovation",
              description: "We embrace change and constantly evolve our offerings."
            }
          ].map((value, idx) => (
            <div key={idx} className="rounded-2xl border p-6 transition-colors hover:bg-muted/50">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
                {value.icon}
              </div>
              <h3 className="mb-2 font-medium">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-24 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold">Ready to start your journey?</h2>
        <p className="mt-4 mb-8 text-muted-foreground max-w-md">
          Explore our courses and products to take your skills to the next level.
        </p>
        <div className="flex gap-4">
          <Button asChild className="rounded-full" size="lg">
            <Link href="/course">Explore Courses <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button asChild className="rounded-full shadow-none" size="lg" variant="outline">
            <Link href="/product">Shop Products <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
