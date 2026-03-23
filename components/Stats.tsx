"use client";

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useRef, useEffect } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const display = useTransform(
    spring,
    (current) => Math.floor(current).toString() + suffix,
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  const stats = [
    { value: 2, suffix: "M+", label: "Article Views" },
    { value: 1000, suffix: "+", label: "People Trained" },
    { value: 7, suffix: "+", label: "Years of Experience" },
    { value: 3, suffix: "", label: "Core Domains: AI · Marketing · Web" },
  ];

  return (
    <section className="bg-dark-bg text-white py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center py-6 lg:py-0 px-4 text-center"
            >
              <span className="font-jetbrains text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="font-dm-sans text-sm text-white/60 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
