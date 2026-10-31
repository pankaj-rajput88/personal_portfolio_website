import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Admin() {
  // token browser me save rehta hai taaki refresh par logout na ho
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
  }, []);

  // Token milte hi messages le aao
  useEffect(() => {
    if (token) loadMessages();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setMessages([]);
  };

  // Server ko request bhejne ka chhota helper (token ke saath)
  const api = async (path, options = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      logout(); // token expire ho gaya
      throw new Error("Session expired. Login again.");
    }
    return res.json();
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      setMessages(await api("/api/admin/messages"));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const toggleRead = async (m) => {
    const updated = await api(`/api/admin/messages/${m._id}`, {
      method: "PATCH",
      body: JSON.stringify({ read: !m.read }),
    });
    setMessages(messages.map((x) => (x._id === m._id ? updated : x)));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await api(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages(messages.filter((x) => x._id !== id));
  };

  // ---------- Login screen ----------
  if (!token) {
    return (
      <div className="admin-wrap">
        <form className="admin-login" onSubmit={login}>
          <h1>Admin login</h1>
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn primary" type="submit">Login</button>
          {error && <p className="form-msg err">{error}</p>}
        </form>
      </div>
    );
  }

  // ---------- Dashboard ----------
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-wrap">
      <div className="admin-head">
        <div>
          <h1>Messages</h1>
          <p className="muted">{messages.length} total, {unread} unread</p>
        </div>
        <div className="admin-actions">
          <button className="btn ghost" onClick={loadMessages}>Refresh</button>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </div>
      </div>

      {error && <p className="form-msg err">{error}</p>}
      {loading && <p className="muted">Loading... (server so raha ho to 30-50 sec lag sakte hain)</p>}
      {!loading && messages.length === 0 && <p className="muted">No messages yet.</p>}

      <div className="admin-list">
        {messages.map((m) => (
          <div className={m.read ? "msg" : "msg unread"} key={m._id}>
            <div className="msg-top">
              <b>{m.name}</b>
              <a href={`mailto:${m.email}`}>{m.email}</a>
              <small>{new Date(m.createdAt).toLocaleString()}</small>
            </div>
            <p>{m.message}</p>
            <div className="msg-actions">
              <button onClick={() => toggleRead(m)}>
                {m.read ? "Mark unread" : "Mark read"}
              </button>
              <button className="danger" onClick={() => remove(m._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}