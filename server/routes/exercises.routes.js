import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createExercise,
  getExercises
} from "../controllers/exercises.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", createExercise);
router.get("/", getExercises);

export default router;
