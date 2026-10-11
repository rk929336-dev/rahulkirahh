import CinematicVideo from "@/components/CinematicVideo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/About";
import CaseStudies from "@/components/sections/CaseStudies";
import Ventures from "@/components/Ventures";
import Services from "@/components/Services";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* 1. Cinematic Video Background Engine */}
      <CinematicVideo />

      {/* Floating Frosted-Glass Header */}
      <Navbar />

      {/* Semantic Content Structure */}
      <div className="relative z-10 flex flex-col">
        {/* 4. Editorial Hero */}
        <Hero />

        {/* 5. Terminal / Inspection-Panel About & Skills Matrix */}
        <About />

        {/* 2. 3D Draggable Case-Study Ring & Website Work */}
        <CaseStudies />

        {/* 5. Ventures ("What I'm Building") */}
        <Ventures />

        {/* 5. Services ("Work With Me") */}
        <Services />

        {/* 3. Unified Experience & Education Timeline */}
        <Experience />

        {/* 5. Compact Certifications Strip */}
        <Certifications />

        {/* 5. Contact with mailto, WhatsApp, and Magnetic Socials */}
        <Contact />

        {/* Global Footer */}
        <Footer />
      </div>
    </main>
  );
}
