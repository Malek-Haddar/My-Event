var Reclamation = require("../models/reclamation");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");


const getReclamation = async(req, res) => {
    try {
        const allReclamations = await Reclamation.find();
        res.status(200).send(allReclamations);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const createReclamation = async(req, res) => {
    var newReclamation = new Reclamation();
    newReclamation.text = req.body.text;
    /* newReclamation.users = req.body.users; */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    } else {
        try {
            await newReclamation.save();
            return res.status(200).json(newReclamation);
        } catch (err) {
            console.log(err);
        }
    }
}

const DeleteReclamation = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(" No Reclamation found with id : ${id} ");

    await Reclamation.findByIdAndRemove(id);
    res.json({ message: " Reclamation has been deleted successfully ! " })

}




module.exports = { getReclamation, createReclamation, DeleteReclamation };