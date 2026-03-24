"use client";

import { motion } from "motion/react";
import { useState } from "react";

const skills = [
  { name: "AI & Automation", score: 92 },
  { name: "Digital Marketing", score: 88 },
  { name: "Content & Writing", score: 90 },
  { name: "Web Development", score: 72 },
  { name: "Training & Teaching", score: 85 },
  { name: "SaaS / Product", score: 70 },
];

export default function SkillMap() {
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    score: number;
    x: number;
    y: number;
  } | null>(null);

  const size = 400;
  const center = size / 2;
  const radius = 130; // Leave room for text
  const levels = 5; // Grid lines

  // Helper to calculate coordinates
  const getCoordinates = (score: number, index: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const distance = (score / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  // Generate polygon points as a path for animation
  const pathData = `M ${skills
    .map((skill, i) => {
      const { x, y } = getCoordinates(skill.score, i);
      return `${x},${y}`;
    })
    .join(" L ")} Z`;

  return (
    <section id="skills" className="py-[60px] md:py-32 bg-base">
      <div className="max-w-7xl mx-auto px-[20px] md:px-12">
        <div className="mb-16">
          <h2 className="font-syne text-[clamp(2rem,6vw,3rem)] md:text-5xl font-bold text-text-primary mb-4">
            Skill Map
          </h2>
          <p className="text-[clamp(1rem,4vw,1.25rem)] md:text-xl text-text-secondary font-medium">
            Where I&apos;m strongest — and by how much.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Chart (60%) */}
          <div className="w-full lg:w-[60%] flex justify-center relative">
            <div className="relative bg-surface rounded-3xl p-4 md:p-8 shadow-sm w-full max-w-[340px] md:max-w-[500px] mx-auto aspect-square flex items-center justify-center">
              <svg
                width="100%"
                height="auto"
                viewBox={`0 0 ${size} ${size}`}
                className="overflow-visible"
              >
                {/* Grid Lines (Concentric polygons) */}
                {[...Array(levels)].map((_, levelIndex) => {
                  const levelScore = ((levelIndex + 1) / levels) * 100;
                  const points = skills
                    .map((_, i) => {
                      const { x, y } = getCoordinates(levelScore, i);
                      return `${x},${y}`;
                    })
                    .join(" ");
                  return (
                    <polygon
                      key={levelIndex}
                      points={points}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border-subtle"
                    />
                  );
                })}

                {/* Axes */}
                {skills.map((_, i) => {
                  const { x, y } = getCoordinates(100, i);
                  return (
                    <line
                      key={`axis-${i}`}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-border-subtle"
                    />
                  );
                })}

                {/* Filled Polygon */}
                <motion.path
                  d={pathData}
                  fill="#0066FF"
                  fillOpacity="0.25"
                  stroke="#0066FF"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {skills.map((skill, i) => {
                  const { x, y } = getCoordinates(skill.score, i);
                  return (
                    <motion.circle
                      key={`point-${i}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#0066FF"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                      onMouseEnter={() => setHoveredSkill({ ...skill, x, y })}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="cursor-pointer hover:r-[7px] transition-all"
                      style={{ pointerEvents: "all" }}
                    />
                  );
                })}

                {/* Labels */}
                {skills.map((skill, i) => {
                  // Push labels out further than 100
                  const { x, y } = getCoordinates(125, i);
                  
                  // Adjust text anchor based on position
                  let textAnchor: "middle" | "start" | "end" = "middle";
                  if (x < center - 10) textAnchor = "end";
                  if (x > center + 10) textAnchor = "start";
                  
                  // Adjust vertical alignment
                  let dy = "0.3em"; // middle
                  if (y < center - 10) dy = "0em"; // slightly up
                  if (y > center + 10) dy = "0.8em"; // slightly down

                  return (
                    <text
                      key={`label-${i}`}
                      x={x}
                      y={y}
                      dy={dy}
                      textAnchor={textAnchor}
                      className="font-dm-sans text-xs md:text-sm font-medium fill-text-primary"
                    >
                      {skill.name}
                    </text>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {hoveredSkill && (
                <div
                  className="absolute bg-text-primary text-base text-xs font-medium px-3 py-2 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px] z-10"
                  style={{
                    left: `${(hoveredSkill.x / size) * 100}%`,
                    top: `${(hoveredSkill.y / size) * 100}%`,
                  }}
                >
                  <div className="whitespace-nowrap">{hoveredSkill.name}</div>
                  <div className="text-[#0066FF] font-bold text-center">
                    {hoveredSkill.score}/100
                  </div>
                  {/* Triangle pointer */}
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
                </div>
              )}
            </div>
          </div>

          {/* Text (40%) */}
          <div className="w-full lg:w-[40%] mt-6 md:mt-0 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg text-text-secondary mx-auto md:mx-0"
            >
              <p className="text-xl leading-relaxed text-text-primary mb-6">
                These scores reflect real-world usage depth, not certifications.
              </p>
              <p className="mb-4">
                My strongest areas are AI automation and content strategy. Web development and SaaS skills let me take these systems from concept to production.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
