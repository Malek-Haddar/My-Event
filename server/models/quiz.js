import mongoose from "mongoose";
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    description: String,
    alternatives: [
      {
        text: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quiz", quizSchema);
