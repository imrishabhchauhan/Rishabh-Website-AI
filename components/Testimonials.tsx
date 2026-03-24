"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

export default function Testimonials() {
  // Testimonial content to be replaced by owner
  /* PLACEHOLDER — Replace with real testimonials before going live */
  const testimonials = [
    {
      quote:
        "Rishabh completely transformed our content pipeline. What used to take our team three days now happens automatically in minutes. His understanding of AI workflows is unmatched.",
      name: "Sarah Jenkins",
      title: "Marketing Director, TechFlow",
    },
    {
      quote:
        "The AI tools masterclass was an eye-opener. Rishabh breaks down complex concepts into actionable strategies. Our entire team is now 3x more productive.",
      name: "David Chen",
      title: "Founder, StartupX",
    },
    {
      quote:
        "Working with Rishabh on our SEO strategy yielded results faster than any agency we've hired before. He builds systems that actually compound over time.",
      name: "Priya Sharma",
      title: "Head of Growth, E-com Plus",
    },
  ];

  return (
    <section className="py-[60px] md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-syne text-[clamp(2rem,6vw,3rem)] md:text-5xl font-bold text-text-primary mb-4"
          >
            What People Say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-base rounded-3xl p-8 md:p-10 flex flex-col h-full border border-accent/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="font-dm-sans text-lg text-text-primary italic leading-relaxed mb-8 flex-grow">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="mt-auto">
                <div className="font-syne font-bold text-text-primary text-lg">
                  {testimonial.name}
                </div>
                <div className="font-jetbrains text-xs text-text-secondary uppercase tracking-wider mt-1">
                  {testimonial.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
