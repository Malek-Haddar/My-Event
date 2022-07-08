import Category from '../models/category.js';
import express from 'express';

import mongoose from 'mongoose';
import { body, validationResult } from "express-validator";
import category from "../models/category.js";

const router = express.Router();

export const getCategory = async (req, res) => {
  try {
    const allCategories = await Category.find()?.populate("sessions");

    res.status(200).send(allCategories);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createCategory = async (req, res) => {
  var newCategory = new Category();
  newCategory.name = req.body.name;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      await newCategory.save();
      return res.status(200).json(newCategory);
    } catch (err) {
      console.log(err);
    }
  }
};

export const DeleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Category Found with id : ${id} ");

  await Category.findByIdAndRemove(id);
  res.json({ message: "Category deleted successfully." });
};
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, sessions } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task Found ! ");

  const updatedCategory = { name, sessions, _id: id };

  await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
  res.json(updatedCategory);
};

// affect session to category
export const affectSessionToCategory = async (req, res) => {
  //   try {
  const { idCategory, idSession } = req.body;

  if (!mongoose.Types.ObjectId.isValid(idCategory))
    return res.status(404).send("No Task Found ! ");

  const updatedCategory = { $addToSet: { sessions: idSession } };

  await Category.findByIdAndUpdate(idCategory, updatedCategory, { new: true });
  res.json(updatedCategory);
};


export const notifCategory = async (req, res) => {
  try {
    const { categoryId, notification } = req.body;

    const categoryNotif = await Category.findByIdAndUpdate(categoryId, {
      notification: notification,
    });

    res.status(200).send(categoryNotif);
  } catch (error) {
    res.send(error);
  }
};




export default router;