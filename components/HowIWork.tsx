"use client";

import { motion } from "motion/react";
import React from "react";

const steps = [
  {
    icon: "🔍",
    title: "Discover",
    description: "Analyze the problem, the goal, and the gap. We make no assumptions."
  },
  {
    icon: "🧠",
    title: "Strategize",
    description: "Design the solution architecture before touching any tool."
  },
  {
    icon: "⚙️",
    title: "Build",
    description: "Deploy the right stack for your needs, including AI, automation, or content systems."
  },
  {
    icon: "🧪",
    title: "Test & Refine",
    description: "Break the system on purpose. We fix the weak points and optimize until it holds."
  },
  {
    icon: "🚀",
    title: "Deliver",
    description: "Hand off the final product with clear documentation. You get a clean, complete, and repeatable system."
  }
];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="py-24 bg-[#F0F5FF]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash-flow-x {
          from { stroke-dashoffset: 12; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes dash-flow-y {
          from { stroke-dashoffset: 12; }
          to { stroke-dashoffset: 0; }
        }
        .animate-dash-x {
          animation: dash-flow-x 0.5s linear infinite;
        }
        .animate-dash-y {
          animation: dash-flow-y 0.5s linear infinite;
        }
      `}} />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How I Work
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Every project follows a system. Here&apos;s mine.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border-t-[3px] border-t-[#0066FF] hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-shadow duration-300 relative z-10 w-full lg:w-[200px] xl:w-[220px] flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <>
                  {/* Desktop Connector */}
                  <div className="hidden lg:block flex-1 h-[2px] relative mx-2 xl:mx-4 mt-12 min-w-[20px]">
                    <svg className="w-full h-6 absolute top-1/2 -translate-y-1/2" preserveAspectRatio="none">
                      <line x1="0" y1="12" x2="100%" y2="12" stroke="#0066FF" strokeWidth="2" strokeDasharray="6,6" className="animate-dash-x" />
                    </svg>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0066FF] translate-x-1/2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <polygon points="0,0 0,12 12,6" />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile Connector */}
                  <div className="lg:hidden h-10 w-[2px] relative my-2">
                    <svg className="w-6 h-full absolute left-1/2 -translate-x-1/2" preserveAspectRatio="none">
                      <line x1="12" y1="0" x2="12" y2="100%" stroke="#0066FF" strokeWidth="2" strokeDasharray="6,6" className="animate-dash-y" />
                    </svg>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#0066FF] translate-y-1/2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <polygon points="0,0 12,0 6,12" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
