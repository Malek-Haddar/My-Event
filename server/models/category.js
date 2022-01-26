const mongoose = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sessions: [{
        type: mongoose.Types.ObjectId,
        ref: "Session",
    }],
})

module.exports = mongoose.model("Category", categorySchema);