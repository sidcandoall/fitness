import prisma from "../lib/prisma.js";

// CREATE workout
export const createWorkout = async (req, res) => {
  try {
    const workout = await prisma.workout.create({
      data: {
        date: new Date(),
        userId: req.user.id
      }
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Failed to create workout" });
  }
};

// GET all workouts for user
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      }
    });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workouts" });
  }
};

// GET single workout
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await prisma.workout.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      }
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workout" });
  }
};

// DELETE workout
export const deleteWorkout = async (req, res) => {
  try {
    await prisma.workout.deleteMany({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete workout" });
  }
};
