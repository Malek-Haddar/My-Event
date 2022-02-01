const mongoose = require("mongoose");
const Schema = mongoose.Schema


const reclamationSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    /* user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }, */
})

module.exports = mongoose.model("Reclamation", reclamationSchema)