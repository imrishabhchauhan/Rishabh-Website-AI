"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  // Blog cards to be connected to CMS or static MDX
  const articles = [
    {
      title: "How to Build an N8N Workflow That Replaces a Junior Marketer",
      category: "AI Workflows",
      date: "Oct 12, 2025",
      readTime: "6 min read",
      image: "https://picsum.photos/seed/blog1/800/500",
    },
    {
      title: "The Future of SEO: Why AI Content Needs Human Strategy",
      category: "Digital Strategy",
      date: "Sep 28, 2025",
      readTime: "8 min read",
      image: "https://picsum.photos/seed/blog2/800/500",
    },
    {
      title: "5 Prompt Engineering Frameworks I Use Daily",
      category: "Prompt Engineering",
      date: "Sep 15, 2025",
      readTime: "5 min read",
      image: "https://picsum.photos/seed/blog3/800/500",
    },
  ];

  return (
    <section id="blog" className="py-[60px] md:py-32 bg-base">
      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="font-syne text-[clamp(2rem,6vw,3rem)] md:text-5xl font-bold text-text-primary mb-4"
            >
              Writing & Insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[clamp(1rem,4vw,1.125rem)] md:text-lg text-text-secondary font-dm-sans"
            >
              2M+ readers. Articles on AI, systems, and digital strategy.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="font-jetbrains text-xs text-accent uppercase tracking-widest font-semibold">
                  {article.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-border-subtle" />
                <span className="font-jetbrains text-xs text-text-secondary uppercase tracking-widest">
                  {article.readTime}
                </span>
              </div>

              <h3 className="font-syne text-2xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </h3>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-subtle">
                <span className="text-sm text-text-secondary font-dm-sans">
                  {article.date}
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                  Read More{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-surface border border-border-subtle text-text-primary px-8 py-4 rounded-full font-medium hover:border-accent hover:text-accent transition-all hover:-translate-y-1"
          >
            Read All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
