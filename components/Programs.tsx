"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { db, collection, getDocs, OperationType, handleFirestoreError } from "@/firebase";

interface Program {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  featured: boolean;
  participants: string;
}

const filters = ["All", "AI", "Marketing", "Web", "Design", "Automation", "Security"];

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const fetchedPrograms = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Program[];
        
        if (fetchedPrograms.length > 0) {
          setPrograms(fetchedPrograms);
        } else {
          // Fallback to initial data if Firestore is empty
          setPrograms([
            {
              id: "1",
              title: "AI Tools Mastery Workshop",
              category: "AI",
              tags: ["AI", "Workshop", "200+ Participants"],
              description: "Zoom-delivered training on Claude, Gemini, ChatGPT, and automation tools for working professionals.",
              featured: true,
              participants: "200+",
            },
            {
              id: "2",
              title: "Digital Marketing Bootcamp",
              category: "Marketing",
              tags: ["Marketing", "Bootcamp", "300+ Participants"],
              description: "Intensive bootcamp covering SEO, content, and paid ads for marketing teams.",
              featured: false,
              participants: "300+",
            },
            {
              id: "3",
              title: "Web Development with AI",
              category: "Web",
              tags: ["Web Dev", "Training", "Live Sessions"],
              description: "Live sessions on building websites using modern frameworks and AI-assisted development workflows.",
              featured: false,
              participants: "Live",
            },
            {
              id: "4",
              title: "Canva for Professionals",
              category: "Design",
              tags: ["Design", "Workshop", "Corporate"],
              description: "Advanced Canva design training tailored for corporate marketing teams and educators.",
              featured: false,
              participants: "Corporate",
            },
            {
              id: "5",
              title: "N8N Automation Workshop",
              category: "Automation",
              tags: ["Automation", "N8N", "Advanced"],
              description: "Hands-on workshop building real-world automation workflows and API integrations using N8N.",
              featured: true,
              participants: "Advanced",
            },
            {
              id: "6",
              title: "Cybersecurity Awareness Program",
              category: "Security",
              tags: ["Security", "Public", "1000+ Reached"],
              description: "Public awareness sessions on cybercrime delivered in partnership with Chandigarh Police.",
              featured: false,
              participants: "1000+",
            },
          ]);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, "projects");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs.filter(
    (program) => activeFilter === "All" || program.category === activeFilter
  );

  return (
    <section id="programs" className="py-[60px] md:py-32 bg-base">
      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-syne text-[clamp(2rem,6vw,3rem)] md:text-5xl font-bold text-text-primary mb-4">
            Programs I&apos;ve Delivered
          </h2>
          <p className="text-[clamp(1rem,4vw,1.25rem)] md:text-xl text-text-secondary font-medium">
            1,000+ people trained across these programs.
          </p>
        </div>

        {/* Filters */}
        <div className="relative mb-12 w-full">
          <div 
            className="flex md:flex-wrap justify-start md:justify-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide [mask-image:linear-gradient(to_right,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_85%,transparent_100%)] md:[mask-image:none] md:[-webkit-mask-image:none]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-2 md:px-6 md:py-2 rounded-full font-dm-sans text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                  activeFilter === filter
                    ? "bg-accent text-white shadow-md"
                    : "bg-surface text-text-secondary hover:bg-border-subtle hover:text-text-primary border border-border-subtle"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
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
                className="group relative bg-surface rounded-2xl p-8 shadow-sm border border-border-subtle transition-all duration-300 hover:-translate-y-[6px] hover:shadow-xl border-l-4 border-l-transparent hover:border-l-accent flex flex-col h-full"
              >
                {/* Featured Badge */}
                {program.featured && (
                  <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Top: Category Tag */}
                <div className="mb-6">
                  <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
                      <span key={i} className="text-xs font-dm-sans text-text-secondary bg-border-subtle px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-dm-sans text-text-secondary leading-relaxed mb-8">
                    {program.description}
                  </p>
                </div>

                {/* Bottom: Badge & Button */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👥</span>
                    <span className="font-dm-sans font-semibold text-text-primary text-sm">
                      {program.participants}
                    </span>
                  </div>
                  <button className="font-dm-sans text-sm font-bold text-accent border border-accent px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition-colors duration-300">
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
