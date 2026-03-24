"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-[60px] md:py-32 bg-dark-bg text-white relative overflow-hidden"
    >
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-[20px] md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-syne text-[clamp(2.5rem,8vw,4rem)] md:text-6xl font-bold mb-6 leading-tight">
              Let&apos;s Build <br />
              <span className="text-accent-glow">Something.</span>
            </h2>
            <p className="text-[clamp(1rem,4vw,1.125rem)] md:text-lg text-white/70 font-dm-sans mb-12 max-w-md">
              Available for AI projects, consulting, and training programs.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Mail
                    size={20}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <div className="font-jetbrains text-xs text-white/50 uppercase tracking-widest mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:imrishabh.work@gmail.com"
                    className="font-dm-sans text-lg hover:text-accent-glow transition-colors"
                  >
                    imrishabh.work@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Linkedin
                    size={20}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <div className="font-jetbrains text-xs text-white/50 uppercase tracking-widest mb-1">
                    LinkedIn
                  </div>
                  <a
                    href="https://linkedin.com/in/rishabhchauhan25"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-dm-sans text-lg hover:text-accent-glow transition-colors"
                  >
                    linkedin.com/in/rishabhchauhan25
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <MapPin
                    size={20}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </div>
                <div>
                  <div className="font-jetbrains text-xs text-white/50 uppercase tracking-widest mb-1">
                    Location
                  </div>
                  <div className="font-dm-sans text-lg">Chandigarh, India</div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-jetbrains text-xs text-white/70">
                I typically respond within 24 hours.
              </span>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <form
              className="bg-surface rounded-3xl p-8 md:p-10 shadow-2xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-jetbrains text-xs text-text-secondary uppercase tracking-widest font-semibold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-dm-sans"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-jetbrains text-xs text-text-secondary uppercase tracking-widest font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-dm-sans"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block font-jetbrains text-xs text-text-secondary uppercase tracking-widest font-semibold mb-2"
                  >
                    Service Interest
                  </label>
                  <select
                    id="service"
                    className="w-full bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-dm-sans appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="ai-workflow">AI Workflow</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="content-strategy">Content Strategy</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-jetbrains text-xs text-text-secondary uppercase tracking-widest font-semibold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-dm-sans resize-y min-h-[120px]"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-4 rounded-xl font-medium hover:bg-accent-glow transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
