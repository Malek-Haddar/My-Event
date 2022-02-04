const mongoose = require("mongoose");
const Schema = mongoose.Schema


const quizzSchema = new Schema({
    question: [{
        type: String,
        required: true,
    }],
})

module.exports = mongoose.model("Quizz", quizzSchema)