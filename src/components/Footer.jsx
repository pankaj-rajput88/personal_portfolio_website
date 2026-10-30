import { me } from "../data";
import useReveal from "../hooks/useReveal";

export default function Footer() {
  const revealRef = useReveal();

  return (
    <footer className="footer" ref={revealRef} data-reveal>
      <div className="footer-inner">
        <div>
          <b className="footer-name">{me.name}</b>
          <p>Full Stack Developer building web apps from database to browser.</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#journey">Journey</a>
        </div>

        <div>
          <p className="eyebrow">Connect</p>
          <a href={`mailto:${me.email}`}>{me.email}</a>
        </div>
      </div>

      <p className="copy">© {new Date().getFullYear()} {me.name}. All rights reserved.</p>
    </footer>
  );
}