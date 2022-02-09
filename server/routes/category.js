import express from 'express';
import { getCategory, createCategory, updateCategory, DeleteCategory } from "../controllers/category.js";

const router = express.Router();

router.get("/", getCategory);
router.post(
    "/add",
    createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", DeleteCategory);

export default router;