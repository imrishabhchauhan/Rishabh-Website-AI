"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Theme initialization
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#programs" },
    { name: "Tools", href: "#tools" },
    { name: "Blog", href: "#blog" },
    { name: "Resume", href: "/Rishabh_Chauhan_Resume.pdf", isDownload: true },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/80 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-syne font-bold text-xl tracking-tight text-text-primary"
          >
            Rishabh Chauhan
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  {...(link.isDownload ? { download: true, target: "_blank" } : {})}
                  className={
                    link.isDownload
                      ? "text-xs font-medium text-accent border border-accent px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-colors"
                      : "text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                  }
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-border-subtle transition-colors text-text-secondary hover:text-accent"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  theme === "light" ? (
                    <Moon size={20} />
                  ) : (
                    <Sun size={20} />
                  )
                ) : (
                  <div className="w-5 h-5" />
                )}
              </button>

              <Link
                href="#contact"
                className="bg-accent text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-accent-glow transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Hire Me
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-border-subtle transition-colors text-text-secondary"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "light" ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>
            <button
              className="text-text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-surface flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-border-subtle transition-colors text-text-secondary"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  theme === "light" ? (
                    <Moon size={24} />
                  ) : (
                    <Sun size={24} />
                  )
                ) : (
                  <div className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-primary p-2"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 px-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    {...(link.isDownload ? { download: true, target: "_blank" } : {})}
                    className={
                      link.isDownload
                        ? "inline-block font-syne text-2xl font-bold text-accent border-2 border-accent px-6 py-2 rounded-full hover:bg-accent hover:text-white transition-colors"
                        : "font-syne text-3xl font-bold text-text-primary hover:text-accent transition-colors block"
                    }
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                className="pt-8"
              >
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block bg-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-accent-glow transition-colors"
                >
                  Let&apos;s Work Together
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
