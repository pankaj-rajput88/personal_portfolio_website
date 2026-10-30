import { projects } from "../data";
import useReveal from "../hooks/useReveal";
import useSpotlight from "../hooks/useSpotlight";

const gradients = [
  "linear-gradient(135deg,#4f5de0,#8794ff)",
  "linear-gradient(135deg,#0ea5e9,#6366f1)",
  "linear-gradient(135deg,#ec4899,#7c3aed)",
];

export default function Projects() {
  const revealRef = useReveal();
  const spotlight = useSpotlight();

  return (
    <section id="projects" className="section" ref={revealRef} data-reveal>
      <p className="eyebrow">Featured projects</p>
      <h2>Things I've built.</h2>
      <p className="sub">Top projects — screenshots, tech and links.</p>

      <div className="project-grid">
        {projects.map((p, i) => (
          // Har project card ko reveal aur mouse-follow glow dono milte hain.
          <article className="project-card" key={p.title} data-reveal {...spotlight}>
            <div
              className="project-shot"
              style={p.image ? undefined : { background: gradients[i % gradients.length] }}
            >
              {p.image ? <img src={p.image} alt={p.title} /> : <span>{p.title}</span>}
            </div>

            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="chips">
                {p.tech.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer">Live site →</a>
                ) : (
                  <small>Live link: add in data.js</small>
                )}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noreferrer">Code →</a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}