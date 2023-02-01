import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const utilisateurSchema = mongoose.Schema(
  {
    name: { type: String, required: [false, "Please add a name"] },
    email: {
      type: String,
      required: [false, "Please add an email"],
      unique: false,
      trim: true,
    },
    password: { type: String, required: [false, "Please add a password"] },
    role: { type: Number, required: false, default: 0 },
    phone: { type: String, required: [false, "Please your phone number"] },
    profession: { type: String, required: [false, "Please add a profession"] },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
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
  },
  {
    timestamps: true,
  }
);
// utilisateurSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// Generate a password reset token
utilisateurSchema.methods.createResetToken = function () {
  const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 600000; // 10 minutes
  return resetToken;
};
export default mongoose.model("Utilisateur", utilisateurSchema);
