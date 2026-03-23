"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function About() {
  const timeline = [
    { year: "2018", role: "Freelance Writer" },
    { year: "2021", role: "MUO Staff Writer" },
    { year: "2023", role: "TalentGro Global" },
    { year: "2025", role: "AI Workflow Strategist" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden group mb-8">
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
              <div className="absolute inset-0 ring-4 ring-accent/0 group-hover:ring-accent/50 rounded-3xl transition-all duration-500 z-20 shadow-[0_0_0_rgba(0,102,255,0)] group-hover:shadow-[0_0_40px_rgba(0,102,255,0.3)]" />
              <Image
                src="https://picsum.photos/seed/rishabh/600/600"
                alt="Rishabh Chauhan"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="px-4 py-2 rounded-full bg-base border border-border-subtle font-jetbrains text-xs text-text-secondary">
                📍 Chandigarh, India
              </span>
              <span className="px-4 py-2 rounded-full bg-base border border-border-subtle font-jetbrains text-xs text-accent font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Open to Work
              </span>
              <span className="px-4 py-2 rounded-full bg-base border border-border-subtle font-jetbrains text-xs text-text-secondary">
                Available for Freelance
              </span>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="mb-4">
              <span className="font-jetbrains text-sm text-accent uppercase tracking-widest font-semibold">
                About
              </span>
            </div>

            <h2 className="font-syne text-4xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
              I Don&apos;t Just Use AI. <br className="hidden md:block" />
              <span className="text-text-secondary">I Build With It.</span>
            </h2>

            <div className="space-y-6 text-lg text-text-secondary font-dm-sans leading-relaxed mb-12">
              <p>
                My journey started at 15 as a freelance tech writer. By 2021, I
                was a Staff Writer at MakeUseOf (MUO), where my articles hit
                over{" "}
                <strong className="text-text-primary font-medium">
                  2 million views
                </strong>
                . I learned early on how to communicate complex technical
                concepts to massive audiences.
              </p>
              <p>
                As AI began reshaping the digital landscape, I transitioned from
                writing about tech to building with it. I&apos;ve trained over{" "}
                <strong className="text-text-primary font-medium">
                  1,000+ people
                </strong>{" "}
                on AI tools, digital marketing, and web development, helping
                them leverage technology to work smarter.
              </p>
              <p>
                Today, I operate at the intersection of AI, marketing, and
                systems thinking. Whether it&apos;s designing complex N8N
                automations, crafting SEO-driven content strategies, or building
                SaaS applications, my goal is simple:{" "}
                <strong className="text-text-primary font-medium">
                  build systems that compound your efforts.
                </strong>
              </p>
            </div>

            {/* Timeline */}
            <div className="pt-8 border-t border-border-subtle">
              <h3 className="font-jetbrains text-sm text-text-primary uppercase tracking-widest font-semibold mb-6">
                Career Milestones
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="text-accent font-jetbrains text-sm mb-2">
                      {item.year}
                    </div>
                    <div className="w-full h-px bg-border-subtle mb-4 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <div className="font-syne font-semibold text-text-primary text-sm md:text-base">
                      {item.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
