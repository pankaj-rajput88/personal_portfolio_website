import { useState, useEffect } from "react";
import useButtonRipple from "./hooks/useButtonRipple";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [dark, setDark] = useState(true);

  // Ek global listener sabhi buttons par ripple lagata hai.
  useButtonRipple();

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}