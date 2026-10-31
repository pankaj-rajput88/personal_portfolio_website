import { useState } from "react";
import { Mail, Link } from "lucide-react";
import { me } from "../data";

// Backend ka address .env se aata hai
const API = import.meta.env.VITE_API_URL;

export default function Contact() {
  // form ki values
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // status: idle (kuch nahi), sending (bhej rahe), success (ho gaya), error (fail)
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // user type kare to state update ho
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send dabane par ye chalega
  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload hone se rokta hai
    setStatus("sending");
    setErrorMsg("");

    try {
      // Backend ko data bhejo
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("success");
      setForm({ name: "", email: "", message: "" }); // form khali karo
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not send. Please try again.");
    }
  };

  return (
    <section id="contact" className="section">
      <p className="eyebrow">Contact</p>
      <h2>Let's build something.</h2>
      <p className="sub">Have a role, internship or project in mind? My inbox is open.</p>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
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

          <button className="btn primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {/* Result ka message */}
          {status === "success" && (
            <p className="form-msg ok">Thanks! Your message was sent. I'll reply soon.</p>
          )}
          {status === "error" && <p className="form-msg err">{errorMsg}</p>}
        </form>

        <div className="direct">
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