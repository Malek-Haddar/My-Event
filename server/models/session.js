const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    name: { type: String },
    start: { type: Date },
    end: { type: Date },
    details: { type: String },
    category: [{
        type: mongoose.Types.ObjectId,
        ref: "category",
    }],
});

module.exports = mongoose.model("Session", sessionSchema);