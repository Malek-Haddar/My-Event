import express from "express";
import mongoose from "mongoose";
import Gallery from "../models/gallery.js";

const router = express.Router();

export const getGalleries = async (req, res) => {
  try {
    const gallery = await Gallery.find();

    res.status(200).json(gallery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getGallery = async (req, res) => {
  const { id } = req.params;

  try {
    const gallery = await Gallery.findById(id);

    res.status(200).json(gallery);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createGallery = async (req, res) => {
  const { name, category, selectedFile } = req.body;

  const newGallery = new Gallery({ name, category, selectedFile });

  try {
    await newGallery.save();

    res.status(201).json(newGallery);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Gallery with id: ${id}`);

  await Gallery.findByIdAndRemove(id);

  res.json({ message: "Gallery deleted successfully." });
};

export default router;
