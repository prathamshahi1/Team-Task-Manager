import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();


// ✅ CORS (IMPORTANT for deployment)
app.use(cors({
  origin: "*", // change to frontend URL later
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());


// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));


// ✅ Serve frontend (after build)
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


// ✅ Test Route
app.get("/api", (req, res) => {
  res.send("API is running 🚀");
});


// ✅ Start Server (Railway uses PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});