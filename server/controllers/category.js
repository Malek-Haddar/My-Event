var Category = require("../models/category");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const getCategory = async(req, res) => {
    try {
        const allCategories = await Category.find().populate('sessions');;

        res.status(200).send(allCategories);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

const createCategory = async(req, res) => {
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


const updateCategory = async(req, res) => {
    const { id } = req.params;
    const { name, sessions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Task Found ! ");

    const updatedCategory = { name, sessions, _id: id };

    await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
    res.json(updatedCategory);
};




const DeleteCategory = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Category Found with id : ${id} ");

    await Category.findByIdAndRemove(id);
    res.json({ message: "Category deleted successfully." });
};
module.exports = { getCategory, createCategory, updateCategory, DeleteCategory };