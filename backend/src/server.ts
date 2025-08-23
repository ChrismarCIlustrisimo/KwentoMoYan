import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import storyRoutes from "./routes/story.route";
import userRoutes from "./routes/user.route";
import { PrismaClient } from "@prisma/client";
import session from "express-session";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: "strict",
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);

// ✅ test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// fallback root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
