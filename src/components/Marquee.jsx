import useReveal from "../hooks/useReveal";

const items = ["VS Code", "Python", "Java", "C++", "JavaScript", "React", "NodeJS", "ExpressJS", "MongoDB", "SQL", "Git", "GitHub", "Netlify"];

export default function Marquee() {
  const revealRef = useReveal();

  // list do baar render hoti hai taaki loop beech me ruke nahi
  return (
    <div className="marquee" aria-hidden="true" ref={revealRef} data-reveal>
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <span key={n}>
            {items.map((t) => (
              <em key={t + n}><b>//</b>{t}</em>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}