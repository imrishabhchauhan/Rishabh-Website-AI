"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const programs = [
  {
    id: 1,
    title: "AI Tools Mastery Workshop",
    category: "AI",
    tags: ["AI", "Workshop", "200+ Participants"],
    description: "Hands-on training on Claude, Gemini, ChatGPT, Canva AI, and automation tools for professionals.",
    featured: true,
    participants: "200+",
  },
  {
    id: 2,
    title: "Digital Marketing Bootcamp",
    category: "Marketing",
    tags: ["Marketing", "Bootcamp", "300+ Participants"],
    description: "Full-stack digital marketing training covering SEO, SMM, content, and paid ads.",
    featured: false,
    participants: "300+",
  },
  {
    id: 3,
    title: "Web Development with AI",
    category: "Web",
    tags: ["Web Dev", "Training", "Live Sessions"],
    description: "Building websites using modern tools + AI-assisted development workflows.",
    featured: false,
    participants: "Live",
  },
  {
    id: 4,
    title: "Canva for Professionals",
    category: "Design",
    tags: ["Design", "Workshop", "Corporate"],
    description: "Advanced Canva training for marketing teams, educators, and content creators.",
    featured: false,
    participants: "Corporate",
  },
  {
    id: 5,
    title: "N8N Automation Workshop",
    category: "Automation",
    tags: ["Automation", "N8N", "Advanced"],
    description: "Building real-world automation workflows using N8N and API integrations.",
    featured: true,
    participants: "Advanced",
  },
  {
    id: 6,
    title: "Cybersecurity Awareness Program",
    category: "Security",
    tags: ["Security", "Public", "1000+ Reached"],
    description: "Awareness sessions on cybercrime delivered in partnership with Chandigarh Police.",
    featured: false,
    participants: "1000+",
  },
];

const filters = ["All", "AI", "Marketing", "Web", "Design", "Automation", "Security"];

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPrograms = programs.filter(
    (program) => activeFilter === "All" || program.category === activeFilter
  );

  return (
    <section id="programs" className="py-24 bg-base">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Programs I&apos;ve Delivered
          </h2>
          <p className="text-xl text-text-secondary font-medium">
            1,000+ people trained. These are the programs that did it.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-dm-sans text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#0066FF] text-white shadow-md"
                  : "bg-white text-text-secondary hover:bg-gray-100 hover:text-text-primary border border-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={program.id}
                data-featured={program.featured}
                className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-xl border-l-4 border-l-transparent hover:border-l-[#0066FF] flex flex-col h-full"
              >
                {/* Featured Badge */}
                {program.featured && (
                  <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Top: Category Tag */}
                <div className="mb-6">
                  <span className="inline-block bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {program.category}
                  </span>
                </div>

                {/* Middle: Title & Description */}
                <div className="flex-grow">
                  <h3 className="font-syne text-2xl font-bold text-text-primary mb-3">
                    {program.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-dm-sans text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-dm-sans text-text-secondary leading-relaxed mb-8">
                    {program.description}
                  </p>
                </div>

                {/* Bottom: Badge & Button */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👥</span>
                    <span className="font-dm-sans font-semibold text-gray-700 text-sm">
                      {program.participants}
                    </span>
                  </div>
                  <button className="font-dm-sans text-sm font-bold text-[#0066FF] border border-[#0066FF] px-4 py-2 rounded-lg hover:bg-[#0066FF] hover:text-white transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
