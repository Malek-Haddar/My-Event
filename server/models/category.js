import mongoose from "mongoose";
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    sessions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);