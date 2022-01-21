var Session = require("../models/session");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

const getSession = async(req, res) => {
    try {
        const allSessions = await Session.find();
        res.status(200).json(allSessions);
    } catch (error) {
        res.status(404).json({ message: error.message() });
    }
};

const createSession = async(req, res) => {
    var newSession = new Session();
    newSession.name = req.body.name;
    newSession.start = req.body.start;
    newSession.end = req.body.end;
    newSession.details = req.body.details;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        try {
            await newSession.save();
            return res.status(200).json(newSession);
        } catch (err) {
            console.error(err);
        }
    }
};

const updateSession = async(req, res) => {
    const { id } = req.params;
    const { name, start, end, details } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Task Found ! ");

    const updatedSession = { name, start, end, details, _id: id };

    await Session.findByIdAndUpdate(id, updatedSession, { new: true });
    res.json(updatedSession);
};

const DeleteSession = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Task Found with id : ${id} ");

    await Session.findByIdAndRemove(id);
    res.json({ message: "Task deleted successfully." });
};

module.exports = { getSession, createSession, updateSession, DeleteSession };