import mongoose from 'mongoose';
const Schema = mongoose.Schema


const quizzSchema = new Schema({
    question: [{
        type: String,
        required: [true, 'Please add the question'],
    }],
},
{
    timestamps: true,
  })

export default mongoose.model("Quizz", quizzSchema)