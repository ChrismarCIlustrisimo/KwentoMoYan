import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";
import storyRoutes from "./routes/story.route";
import userRoutes from "./routes/user.route";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    },
  })
);

// routes
app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

export default app;
