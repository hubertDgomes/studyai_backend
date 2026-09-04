import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
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
		questions: [
			{
				question: {
					type: String,
					required: true,
				},
				options: {
					type: [String],
					required: true,
				},
				correctAnswer: {
					type: String,
					required: true,
				},
				explanation: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model("quizzes", quizSchema);
