import { me } from "../data";
import useReveal from "../hooks/useReveal";

const facts = [
  ["Location", me.location],
  ["Education", "B.Tech CSE — ABES Engineering College (2023–2027)"],
  ["Looking for", "Full-stack developer role / internship"],
  ["Languages", "Python, Java, C, C++, JavaScript, SQL"],
];

export default function About() {
  const revealRef = useReveal();

  return (
    <section id="about" className="section about" ref={revealRef} data-reveal>
      <div>
        <p className="eyebrow">About</p>
        <h2>A fresher who ships.</h2>
        <p className="body">
          I'm {me.name}, a Full Stack Developer and B.Tech Computer Science student at ABES Engineering College, Ghaziabad (2023–2027). I build responsive web apps with React, Node.js and Express, and I'm comfortable across the stack — from MongoDB and SQL databases to the browser.
        </p>
        <p className="body">
          Alongside my degree, I spent early 2025 teaching C, C++, HTML and CSS offline — explaining fundamentals is how I keep my own sharp. I've built and deployed projects like a real-time weather app and a Spotify clone, and I'm currently open to full-time roles and internships.
        </p>
      </div>

      <aside className="facts" data-reveal>
        <p className="eyebrow">Quick facts</p>
        {facts.map(([label, value]) => (
          <div className="fact" key={label}>
            <small>{label}</small>
            <p>{value}</p>
          </div>
        ))}
      </aside>
    </section>
  );
}