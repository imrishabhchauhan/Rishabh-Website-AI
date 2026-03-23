import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import SkillMap from "@/components/SkillMap";
import Services from "@/components/Services";
import HowIWork from "@/components/HowIWork";
import Programs from "@/components/Programs";
import Tools from "@/components/Tools";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="min-h-screen bg-base text-text-primary">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <SkillMap />
      <Services />
      <HowIWork />
      <Programs />
      <Tools />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
