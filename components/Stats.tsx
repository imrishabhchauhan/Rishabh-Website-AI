"use client";

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const display = useTransform(
    spring,
    (current) => Math.floor(current).toLocaleString() + suffix,
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch("/api/visitors");
        if (res.ok) {
          const data = await res.json();
          if (data.count !== null) {
            setVisitorCount(data.count);
            return;
          }
        }
        setVisitorCount(1000); // Fallback
      } catch (error) {
        setVisitorCount(1000); // Fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const stats = [
    { value: 2, suffix: "M+", label: "Article Views" },
    { value: 1000, suffix: "+", label: "People Trained" },
    { value: 7, suffix: "+", label: "Years of Experience" },
    { value: 3, suffix: "", label: "Core Domains: AI · Marketing · Web" },
  ];

  return (
    <section className="bg-dark-bg text-white py-[60px] md:py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-[1px] bg-[#0066FF]/50 lg:bg-transparent lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col items-center justify-center p-4 lg:py-0 lg:px-4 text-center bg-dark-bg lg:bg-transparent ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <span className="font-jetbrains text-[clamp(1.8rem,6vw,2.5rem)] md:text-5xl font-bold text-white mb-2 tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-dm-sans text-[0.7rem] md:text-sm text-white/60 uppercase tracking-[0.05em] md:tracking-wider font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
          
          {/* Live Visitor Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: stats.length * 0.1 }}
            className="flex flex-col items-center justify-center p-4 lg:py-0 lg:px-4 text-center bg-dark-bg lg:bg-transparent col-span-2 lg:col-span-1"
          >
            <span className="font-jetbrains text-[clamp(1.8rem,6vw,2.5rem)] md:text-5xl font-bold text-white mb-2 tracking-tighter flex items-center justify-center min-h-[48px] md:min-h-[60px]">
              {isLoading ? (
                <div className="h-10 w-24 bg-white/10 animate-pulse rounded-md" />
              ) : (
                <Counter 
                  value={visitorCount || 1000} 
                  suffix={visitorCount === 1000 ? "+" : ""} 
                />
              )}
            </span>
            <span className="font-dm-sans text-[0.7rem] md:text-sm text-white/60 uppercase tracking-[0.05em] md:tracking-wider font-medium">
              Website Visitors
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
