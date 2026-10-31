import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import Message from "./models/Message.js";

const app = express();

// CLIENT_URL na ho to bhi server crash nahi hoga
const allowedOrigins = (
  process.env.CLIENT_URL ||
  "http://localhost:5173,https://effervescent-maamoul-c92eb6.netlify.app"
).split(",");
app.use(cors({ origin: allowedOrigins }));

// Form ka JSON data padhne ke liye
app.use(express.json());

// Render proxy ke peeche chalta hai, isliye ye zaroori hai
app.set("trust proxy", 1);

// Ek IP se 15 minute me sirf 5 messages
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages. Please try again later." },
});

// Test route: browser me kholke dekhne ke liye ki server chal raha hai
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend is running" });
});

// ---------- CONTACT FORM ----------
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Check karo ki teeno cheezein aayi ya nahi
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    // 2. Email ka simple check
    const emailOk = /^\S+@\S+\.\S+$/.test(email);
    if (!emailOk) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    // 3. Database me save karo
    await Message.create({ name, email, message });

    res.status(201).json({ success: true, message: "Message received" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong, try again" });
  }
});

// ---------- ADMIN ----------

// Login par sirf 10 koshish 15 minute me (password guess karne se rokta hai)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts. Try again later." },
});

// Login: sahi password par token milta hai
app.post("/api/admin/login", loginLimiter, (req, res) => {
  const { password } = req.body;
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Wrong password" });
  }
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// Guard: token sahi ho tabhi aage jane do
function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Not authorized" });
  }
}

// Saare messages (naye pehle)
app.get("/api/admin/messages", requireAdmin, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// Message ko read/unread karo
app.patch("/api/admin/messages/:id", requireAdmin, async (req, res) => {
  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { read: req.body.read },
    { new: true }
  );
  res.json(msg);
});

// Message delete karo
app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ---------- START ----------
// Pehle database se connect ho, phir server start karo
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err.message));