import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // <-- 1. Import Admin Routes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection (This is also a quick fix version, see note below)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes); // <-- 2. Use Admin Routes

// Default route
app.get("/", (req, res) => {
  res.send("🎯 Student Management API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));