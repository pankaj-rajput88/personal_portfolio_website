import mongoose from "mongoose";

// Schema = database me ek message kaisa dikhega, uska naksha
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    read: { type: Boolean, default: false }, // padha hua ya nahi
  },
  { timestamps: true } // apne aap createdAt (kab aaya) save hota hai
);

export default mongoose.model("Message", messageSchema);