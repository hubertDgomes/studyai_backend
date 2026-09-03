import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userdata",
      required: true,
    },
    extractedText: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["processing", "ready", "failed"],
      default: "processing",
      // required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("documents", documentsSchema);
