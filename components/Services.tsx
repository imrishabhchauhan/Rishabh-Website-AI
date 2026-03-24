"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "AI Workflow Development",
      description:
        "Custom N8N and Make workflows integrated with LLMs to replace repetitive human tasks.",
      includes: [
        "Workflow audit",
        "System design",
        "Build + deployment",
        "Documentation",
      ],
      price: "₹15,000 / project",
      cta: "Get a Quote",
      popular: true,
    },
    {
      title: "Digital Marketing Consulting",
      description:
        "SEO, social media pipelines, and campaign architecture built to compound over time.",
      includes: [
        "Audit",
        "Strategy deck",
        "Execution roadmap",
        "Monthly retainer option",
      ],
      price: "₹8,000 / month",
      cta: "Book a Call",
      popular: false,
    },
    {
      title: "Content Strategy",
      description:
        "Content systems for founders, educators, and brands entering the AI space. We define your positioning and build a scalable content calendar.",
      includes: [
        "Brand voice doc",
        "Content calendar",
        "LinkedIn + long-form strategy",
      ],
      price: "₹5,000 / month",
      cta: "Start Today",
      popular: false,
    },
  ];

  return (
    <section id="services" className="py-[60px] md:py-32 bg-base">
      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-syne text-[clamp(2rem,6vw,3rem)] md:text-5xl font-bold text-text-primary mb-4"
          >
            What I Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(1rem,4vw,1.125rem)] md:text-lg text-text-secondary font-dm-sans"
          >
            Three services. Each one built around a specific type of problem.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-surface rounded-3xl p-8 border border-border-subtle shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,102,255,0.1)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Top Gradient Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {service.popular && (
                <div className="absolute top-6 right-6">
                  <span className="bg-accent/10 text-accent font-jetbrains text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-syne text-2xl font-bold text-text-primary mb-4 pr-24">
                {service.title}
              </h3>

              <p className="text-text-secondary font-dm-sans mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>

              <div className="mb-8">
                <h4 className="font-jetbrains text-xs text-text-primary uppercase tracking-widest font-semibold mb-4">
                  Includes
                </h4>
                <ul className="space-y-3 pl-4 md:pl-0">
                  {service.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-text-secondary font-dm-sans break-words"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-accent shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8 border-t border-border-subtle">
                <div className="font-jetbrains text-[clamp(1.2rem,4vw,1.5rem)] md:text-lg font-bold text-text-primary mb-6">
                  {service.price}
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-base border border-border-subtle group-hover:border-accent group-hover:bg-accent group-hover:text-white text-text-primary py-3 rounded-full font-medium transition-all duration-300">
                  {service.cta}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
