import express from 'express';
import { getEvent, createEvent, updateEvent, DeleteEvent } from '../controllers/event.js';

const router = express.Router();

router.get("/", getEvent);
router.post("/add", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", DeleteEvent);

export default router;