import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [false, "Please add a name"] },
    email: {
      type: String,
      required: [false, "Please add an email"],
      unique: false,
    },
    password: { type: String, required: [false, "Please add a password"] },
    role: { type: Number, required: false, default: 0 },
    category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        // default: "62d883fc8539a7ae226e1977",
      },
    ],
    sessions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Session",
      },
    ],
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
      },
    ],
    checkIn: [
      {
        date: { type: Date },
        sessions: [{ type: mongoose.Types.ObjectId, ref: "Session" }],
      },
    ],
    // notification: [
    //   {
    //     subject: { type: String },
    //     message: { type: String },
    //     userNotif: { type: mongoose.Types.ObjectId, ref: "User" },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
