import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createSet, deleteSet } from "../controllers/sets.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSet);
router.delete("/:id", deleteSet);

export default router;
