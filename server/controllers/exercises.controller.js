import prisma from "../lib/prisma.js";

export const createExercise = async (req, res) => {
  try {
    const { name, workoutId } = req.body;

    if (!workoutId) {
      return res.status(400).json({
        success: false,
        message: "workoutId is required"
      });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Exercise name is required"
      });
    }

    const existing = await prisma.exercise.findFirst({
      where: {
        name: name.trim().toLowerCase(),
        workoutId
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Exercise already exists for this workout"
      });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name: name.trim().toLowerCase(),
        workoutId
      }
    });

    res.status(201).json({
      success: true,
      data: exercise
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create exercise"
    });
  }
};

export const getExercises = async (req, res) => {
  try {
    const { workoutId } = req.query;

    if (!workoutId) {
      return res.status(400).json({
        success: false,
        message: "workoutId is required"
      });
    }

    const exercises = await prisma.exercise.findMany({
      where: { workoutId },
      orderBy: { name: "asc" }
    });

    res.json({ success: true, data: exercises });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exercises"
    });
  }
};