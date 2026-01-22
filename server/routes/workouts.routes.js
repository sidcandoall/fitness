console.log("WORKOUT ROUTES LOADED");
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout
} from "../controllers/workouts.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createWorkout);
router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.delete("/:id", deleteWorkout);

export default router;
