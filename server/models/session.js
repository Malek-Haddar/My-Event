import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    start: { type: Date, required: [true, "Please add the start date"] },
    end: { type: Date, required: [true, "Please add the end date"] },
    details: { type: String, required: [true, "Please add some details"] },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    ],
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },

    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Utilisateur",
      },
    ],
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "Utilisateur",
        },
      },
    ],
    quiz: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Quiz",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema);
