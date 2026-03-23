"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "AI Workflows", "Web", "Marketing", "Training"];

  // Portfolio items to be replaced with real project data by owner
  const projects = [
    {
      id: 1,
      title: "Automated Content Pipeline",
      category: "AI Workflows",
      description:
        "N8N workflow connecting RSS feeds, Claude 3.5 Sonnet, and WordPress for automated drafting.",
      image: "https://picsum.photos/seed/ai1/800/600",
    },
    {
      id: 2,
      title: "SaaS Landing Page",
      category: "Web",
      description:
        "High-converting landing page built with Next.js and Tailwind CSS for an AI startup.",
      image: "https://picsum.photos/seed/web1/800/600",
    },
    {
      id: 3,
      title: "B2B SEO Strategy",
      category: "Marketing",
      description:
        "Comprehensive SEO and content strategy that increased organic traffic by 150% in 3 months.",
      image: "https://picsum.photos/seed/marketing1/800/600",
    },
    {
      id: 4,
      title: "AI Tools Masterclass",
      category: "Training",
      description:
        "Curriculum design and delivery for a 4-week cohort-based course on practical AI tools.",
      image: "https://picsum.photos/seed/training1/800/600",
    },
    {
      id: 5,
      title: "Lead Gen Automation",
      category: "AI Workflows",
      description:
        "Make.com scenario capturing leads from LinkedIn, enriching data, and syncing to CRM.",
      image: "https://picsum.photos/seed/ai2/800/600",
    },
    {
      id: 6,
      title: "E-commerce Redesign",
      category: "Web",
      description:
        "Modern headless Shopify storefront focusing on performance and conversion rate optimization.",
      image: "https://picsum.photos/seed/web2/800/600",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="font-syne text-4xl md:text-5xl font-bold text-text-primary mb-4"
            >
              Work That Speaks
            </motion.h2>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-jetbrains text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-text-primary text-white"
                    : "bg-base text-text-secondary hover:bg-border-subtle hover:text-text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              className="group relative rounded-3xl overflow-hidden bg-base border border-border-subtle cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-dark-bg/20 group-hover:bg-dark-bg/0 transition-colors duration-500 z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Hover Overlay CTA */}
                <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                  <span className="bg-white text-accent px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>

              <div className="p-6 relative z-30 bg-surface">
                <span className="font-jetbrains text-xs text-accent uppercase tracking-widest font-semibold mb-3 block">
                  {project.category}
                </span>
                <h3 className="font-syne text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary font-dm-sans text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
