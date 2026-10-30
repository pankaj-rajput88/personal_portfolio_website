import { useState } from "react";
import { ArrowRight, Mail, Link } from "lucide-react";
import { me } from "../data";
import useReveal from "../hooks/useReveal";

export default function Contact() {
  const revealRef = useReveal();
  // form ki values yahan save hoti hain
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // jab bhi user type kare, state update ho
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send dabane par tumhara email app khulega (backend baad me lagayenge)
  const handleSubmit = (e) => {
    e.preventDefault(); // page reload hone se rokta hai
    const subject = `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`;
    window.location.href =
      `mailto:${me.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section" ref={revealRef} data-reveal>
      <p className="eyebrow">Contact</p>
      <h2>Let's build something.</h2>
      <p className="sub">Have a role, internship or project in mind? My inbox is open.</p>

      <div className="contact-grid">
        {/* Left: form */}
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <label>
            Name
            <input name="name" required placeholder="Your name"
              value={form.name} onChange={handleChange} />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="you@example.com"
              value={form.email} onChange={handleChange} />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required
              placeholder="What would you like to build together?"
              value={form.message} onChange={handleChange} />
          </label>
          <button className="btn primary" type="submit">Send message <ArrowRight size={18} /></button>
        </form>

        {/* Right: direct links */}
        <div className="direct" data-reveal>
          <p className="eyebrow">Reach me directly</p>

          <a className="direct-card" href={`mailto:${me.email}`}>
            <Mail size={22} />
            <span><small>Email</small>{me.email}</span>
          </a>

          <a className="direct-card" href={me.linkedin || "#contact"} target="_blank" rel="noreferrer">
            <Link size={22} />
            <span><small>LinkedIn</small>{me.linkedin || "Add link in data.js"}</span>
          </a>

          <a className="direct-card" href={me.github || "#contact"} target="_blank" rel="noreferrer">
            <Link size={22} />
            <span><small>GitHub</small>{me.github || "Add link in data.js"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}