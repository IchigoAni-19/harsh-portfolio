import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DeveloperActivity from "@/components/DeveloperActivity";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => (
  <>
    <AnimatedBackground />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <DeveloperActivity />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
