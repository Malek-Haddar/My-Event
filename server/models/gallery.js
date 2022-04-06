import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    category: {
      type: String,
      required: [true, "Please add images category"],
    },
    selectedFile: {
      type: String,
      required: [true, "Please add image"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", gallerySchema);
