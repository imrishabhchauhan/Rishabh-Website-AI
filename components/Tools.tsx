"use client";

import { motion } from "motion/react";

export default function Tools() {
  const toolCategories = [
    {
      name: "AI & LLMs",
      tools: ["Claude", "Gemini", "ChatGPT", "Google AI Studio"],
    },
    {
      name: "Automation",
      tools: ["N8N", "Make (Integromat)"],
    },
    {
      name: "Design",
      tools: ["Canva", "Freepik Space"],
    },
    {
      name: "Dev & Coding",
      tools: ["Cursor", "Kiro", "Lovable.dev", "WordPress"],
    },
    {
      name: "Video & Voice",
      tools: ["HeyGen", "ElevenLabs", "Google Flow", "Filmora"],
    },
    {
      name: "Presentations",
      tools: ["Gamma.app"],
    },
    {
      name: "Research",
      tools: ["NotebookLM", "LM Arena"],
    },
  ];

  return (
    <section
      id="tools"
      className="py-[60px] md:py-32 bg-base relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-syne text-[clamp(2rem,6vw,3rem)] md:text-5xl font-bold text-text-primary mb-4"
          >
            My Tech Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(1rem,4vw,1.125rem)] md:text-lg text-text-secondary font-dm-sans"
          >
            Tools I use daily to build, automate, and deliver.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {toolCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-surface rounded-3xl p-8 border border-border-subtle hover:border-accent/30 hover:shadow-[0_10px_30px_-15px_rgba(0,102,255,0.1)] transition-all duration-300"
            >
              <h3 className="font-jetbrains text-[10px] md:text-sm text-accent uppercase tracking-[0.05em] md:tracking-widest font-semibold mb-4 md:mb-6">
                {category.name}
              </h3>
              <div className="grid grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-3">
                {category.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="flex flex-col items-center justify-center text-center px-1 py-2 md:px-4 md:py-2 bg-base rounded-lg text-[10px] md:text-sm font-medium text-text-primary border border-border-subtle hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
