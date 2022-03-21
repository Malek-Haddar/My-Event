import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Please add title"] },
    message: { type: String, required: [true, "Please add message"] },
    name: { type: String, required: [true, "Please add name"] },
    creator: { type: String, required: [true, "Please addcreator"] },
    selectedFile: { type: String, required: [true, "Please add file"] },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;