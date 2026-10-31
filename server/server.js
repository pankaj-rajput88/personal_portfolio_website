import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
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

// Test route: browser me kholke dekhne ke liye ki server chal raha hai
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend is running" });
});

// Contact form yahan data bhejega
app.post("/api/contact", async (req, res) => {
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

// Pehle database se connect ho, phir server start karo
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err.message));