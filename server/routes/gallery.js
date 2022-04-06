import express from "express";

import {
  getGalleries,
  getGallery,
  createGallery,
  deleteGallery,
} from "../controllers/gallery.js";

const router = express.Router();

router.get("/", getGalleries);
router.post("/add", createGallery);
router.get("/:id", getGallery);
router.delete("/:id", deleteGallery);

export default router;
