import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendeeSchema = new Schema(
  {
    checkIn: [
      {
        type: Date,
      },
    ],
    sessions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Session",
      },
    ],
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendee", attendeeSchema);
