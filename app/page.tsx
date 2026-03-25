'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Programs from "@/components/Programs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useFirebase } from "@/components/FirebaseProvider";

export default function Home() {
  const { settings } = useFirebase();

  return (
    <main className="min-h-screen bg-base text-text-primary">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      {settings?.showServices !== false && <Services />}
      {settings?.showWork !== false && <Programs />}
      {settings?.showContact !== false && <Contact />}
      <Footer />
      <Chatbot />
    </main>
  );
}
