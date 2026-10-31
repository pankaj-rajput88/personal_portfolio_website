import { ArrowRight, Download } from "lucide-react";
import { me } from "../data";
import useReveal from "../hooks/useReveal";

const profile = {
  name: me.name,
  role: me.role,
  location: me.location,
  education: me.education,
  open_to_work: true,
  stack: me.stack,
  email: me.email,
  github: me.github || "add url",
  linkedin: me.linkedin || "add url",
};

// JSON ko color ke saath dikhane ke liye
function Json({ data }) {
  const entries = Object.entries(data);
  return (
    <pre className="json">
      {"{\n"}
      {entries.map(([k, v], i) => (
        <span key={k}>
          {"  "}<span className="k">"{k}"</span>{": "}
          {typeof v === "boolean" ? (
            <span className="b">{String(v)}</span>
          ) : Array.isArray(v) ? (
            <>[{v.map((x, j) => (<span key={x}><span className="s">"{x}"</span>{j < v.length - 1 ? ", " : ""}</span>))}]</>
          ) : (
            <span className="s">"{v}"</span>
          )}
          {i < entries.length - 1 ? "," : ""}{"\n"}
        </span>
      ))}
      {"}"}
    </pre>
  );
}

export default function Hero() {
  const revealRef = useReveal();

  return (
    <section className="hero" id="top" ref={revealRef}>
      <div className="hero-text">
        {/* Har hero item ka delay alag hai, isliye text ek-ek karke aata hai. */}
        <span className="badge" data-reveal style={{ "--reveal-delay": "0ms" }}><i /> Open to work</span>
        <h1 data-reveal style={{ "--reveal-delay": "110ms" }}>
          {/* Gradient phrase ko CSS accent colors se highlight karta hai. */}
          I build web apps from <span className="gradient-text">database to browser</span>.
        </h1>
        <p className="lead" data-reveal style={{ "--reveal-delay": "220ms" }}>
          Fresher Full Stack Developer from {me.location}. I build responsive web apps end to end — from the database to the browser.
        </p>
        <div className="btn-row" data-reveal style={{ "--reveal-delay": "330ms" }}>
          <a className="btn primary" href="#projects">View Projects <ArrowRight size={18} /></a>
          <a
            className="btn ghost"
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            <Download size={18} /> Download Resume
          </a>
        </div>
      </div>

      <div className="code-card" data-reveal style={{ "--reveal-delay": "440ms" }}>
        <div className="code-top">
          <span className="dots"><i /><i /><i /></span>
          <code>GET /api/developer/me</code>
          <b>200 OK</b>
        </div>
        <Json data={profile} />
      </div>
    </section>
  );
}