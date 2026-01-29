import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import workoutRoutes from "./routes/workouts.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";
import setsRoutes from "./routes/sets.routes.js";

const app = express();

/* 🔥 EXPLICIT CORS CONFIG (THIS FIXES PREFLIGHT) */
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 HANDLE PREFLIGHT REQUESTS */
app.options("*", cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/sets", setsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
