import express from 'express';
import {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.js";

const router = express.Router();

router.get("/", getEvent);
router.post("/add", createEvent);
router.patch("/:id", updateEvent);
router.delete("/delete/:eventId", deleteEvent);


export default router;