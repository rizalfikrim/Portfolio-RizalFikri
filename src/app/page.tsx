import Hero from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Experience } from "../components/sections/Experience";
import { Certificates } from "../components/sections/Certificates";
import { Skills } from "../components/sections/Skills";
import { Contact } from "../components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-20" />
      <About />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-20" />
      <Experience />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-20" />
      <Certificates />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-20" />
      <Skills />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-20" />
      <Contact />
    </main>
  );
}
