import prisma from "../lib/prisma.js";

export const createSet = async (req, res) => {
  try {
    const { reps, weight, exerciseId } = req.body;

    const set = await prisma.set.create({
      data: {
        reps,
        weight,
        exerciseId,
      },
    });

    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSet = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.set.delete({
      where: { id },
    });

    res.json({ message: "Set deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
