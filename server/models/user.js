import mongoose from "mongoose";


const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: { type: String, required: [true, "Please add a password"] },
    role: { type: Number, required: true, default: 0 },
    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    ],
    sessions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Session",
      },
    ],
    checkIn: [{ type: Date }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);