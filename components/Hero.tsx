"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useFirebase } from "@/components/FirebaseProvider";

export default function Hero() {
  const { settings } = useFirebase();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roles = [
    "AI Strategist",
    "Workflow Architect",
    "Digital Marketer",
    "Content Strategist",
  ];

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-base"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 bg-grid-pattern opacity-40"
      />

      {/* Abstract Floating Shapes */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl mix-blend-multiply animate-[float_10s_ease-in-out_infinite] z-0 pointer-events-none opacity-[0.03] md:opacity-100 scale-[0.6] md:scale-100 origin-right" />
      <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-accent-glow/5 rounded-full blur-3xl mix-blend-multiply animate-[float_8s_ease-in-out_infinite_reverse] z-0 pointer-events-none opacity-[0.03] md:opacity-100 scale-[0.6] md:scale-100 origin-right" />

      <div className="max-w-7xl mx-auto px-[20px] md:px-12 w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-subtle shadow-sm mb-3 md:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-jetbrains text-xs font-medium text-text-secondary uppercase tracking-wider">
              {settings?.status || "AI Workflow Builder & Strategist"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-syne text-[clamp(2rem,8vw,4rem)] md:text-7xl lg:text-8xl font-bold text-text-primary leading-[1.1] tracking-tight mb-6"
          >
            Rishabh Chauhan
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[clamp(1.5rem,6vw,2rem)] md:text-3xl font-medium text-text-primary mb-6 h-10 flex items-center"
          >
            <span className="mr-2">I Build</span>
            <div className="relative h-full overflow-hidden w-[300px] md:w-[400px]">
              <motion.div
                key={currentRole}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="absolute inset-0 flex items-center text-accent"
              >
                {roles[currentRole]}
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[clamp(1rem,4vw,1.25rem)] md:text-lg text-text-secondary max-w-full md:max-w-2xl mb-10 leading-relaxed text-balance break-words"
          >
            I build AI workflows, content systems, and marketing infrastructure for businesses that want to scale without adding headcount. 7+ years of experience. 2M+ readers. 1,000+ trained.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col md:flex-row w-full md:w-auto items-center gap-3 md:gap-4"
          >
            <Link
              href="#contact"
              className="w-full md:w-auto text-center bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent-glow transition-all shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:-translate-y-1"
            >
              Let&apos;s Work Together
            </Link>
            <Link
              href="#programs"
              className="w-full md:w-auto text-center bg-surface text-text-primary border border-border-subtle px-8 py-4 rounded-full font-medium hover:border-accent hover:text-accent transition-all hover:-translate-y-1"
            >
              View My Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-3 md:mt-6 w-full md:w-auto"
          >
            <a
              href={settings?.resumeUrl || "/Rishabh_Chauhan_Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-medium border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all hover:-translate-y-1"
            >
              <ArrowDown size={20} />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right Content / Decorative */}
        <div className="lg:col-span-4 hidden lg:block relative h-full">
          {/* We can add a stylized 3D element or abstract graphic here if needed, 
              but the background shapes provide the vibe. */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-jetbrains text-xs text-text-secondary uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-text-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
