import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    start: { type: Date, required: [true, "Please add the start date"] },
    end: { type: Date, required: [true, "Please add the end date"] },
    details: { type: String, required: [true, "Please add some details"] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", sessionSchema);
