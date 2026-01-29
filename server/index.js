import express from "express";
import authRoutes from "./routes/auth.routes.js";
import workoutRoutes from "./routes/workouts.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";
import setsRoutes from "./routes/sets.routes.js";

console.log("Starting server...");
console.log("Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5001,
  JWT_SECRET: process.env.JWT_SECRET ? "SET" : "NOT SET",
  DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET"
});

const app = express();

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Server is running", message: "Fitness API is live! 💪" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/exercises", exercisesRoutes); 
app.use("/sets", setsRoutes);           

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
