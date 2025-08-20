import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import storyRoutes from "./routes/story.route";
import userRoutes from "./routes/user.route";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
