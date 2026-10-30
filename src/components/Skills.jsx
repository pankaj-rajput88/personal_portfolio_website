import { Layout, Server, Cpu, Database, GitBranch } from "lucide-react";
import { skills } from "../data";
import useReveal from "../hooks/useReveal";
import useSpotlight from "../hooks/useSpotlight";

const icons = {
  Frontend: Layout,
  Backend: Server,
  "CS Fundamentals": Cpu,
  Database: Database,
  DevOps: GitBranch,
};

export default function Skills() {
  const revealRef = useReveal();
  const spotlight = useSpotlight();

  return (
    <section id="skills" className="section" ref={revealRef} data-reveal>
      <p className="eyebrow">Skills</p>
      <h2>What I work with.</h2>
      <p className="sub">Grouped by where each tool lives in my stack.</p>

      <div className="skill-grid">
        {skills.map((group) => {
          const Icon = icons[group.title] || Layout;
          return (
            // data-reveal scroll par card dikhata hai; spotlight mouse ke saath move karta hai.
            <div className="skill-card" key={group.title} data-reveal {...spotlight}>
              <h3><Icon size={20} /> {group.title}</h3>
              <div className="chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}