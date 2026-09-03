import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "userdata",
			required: true,
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "documents",
			required: true,
		},
		question: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("questions", questionSchema);
