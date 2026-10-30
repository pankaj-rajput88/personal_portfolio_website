import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = ["Projects", "About", "Skills", "Journey", "Contact"];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll par navbar ko glass effect dete hain aur current section track karte hain.
  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75] });

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateScrolled);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={scrolled ? "nav scrolled" : "nav"}>
      <a href="#top" className="brand">
        <span className="logo">{"</>"}</span>
        Pankaj Lodhi
      </a>

      <nav className={open ? "nav-links show" : "nav-links"}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setOpen(false)}
            aria-current={activeSection === l.toLowerCase() ? "location" : undefined}
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button className="icon-btn" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}