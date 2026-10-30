import { Briefcase, Trophy, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import { journey } from "../data";
import useReveal from "../hooks/useReveal";

// Har type ka apna icon
const icons = {
  Experience: Briefcase,
  Achievement: Trophy,
  Education: GraduationCap,
};

export default function Journey() {
  const revealRef = useReveal();
  const timelineRef = useRef(null);

  // Scroll ke saath viewport ke andar timeline ki line ko dheere-dheere bharte hain.
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = timeline.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - bounds.top) / bounds.height));
        timeline.style.setProperty("--timeline-progress", String(progress));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section id="journey" className="section" ref={revealRef} data-reveal>
      <p className="eyebrow">Journey</p>
      <h2>The path so far.</h2>

      {/* data.js ki journey list ko loop karke har item dikhate hain */}
      {journey.length > 0 ? (
        <div className="timeline" ref={timelineRef}>
          {journey.map((item) => {
            const Icon = icons[item.type];
            return (
              <div className="timeline-item" key={item.title} data-reveal>
                <div className="timeline-top">
                  <span className="tag"><Icon size={14} /> {item.type}</span>
                  <code>{item.date}</code>
                </div>
                <h3>{item.title}</h3>
                {item.sub && <p className="timeline-sub">{item.sub}</p>}
                <p className="timeline-text">{item.text}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="body">Journey details coming soon.</p>
      )}
    </section>
  );
}