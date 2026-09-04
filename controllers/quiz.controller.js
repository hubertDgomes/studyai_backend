import documentsSchema from "../models/documentsSchema.js";
import quizSchema from "../models/quizSchema.js";
import generateQuiz from "../services/quiz.js";

const quizController = async (req, res) => {
  const { id } = req.params;
  const {questionCount}  = req.body;

  const checkDocument = await documentsSchema.findById(id);
  if (!checkDocument) {
    return res.status(404).json({
      message: "Document not found",
    });
  }

  const generatedQuizWithAi = await generateQuiz({
    documentText: checkDocument.extractedText,
    questionCount,
  });

  const newQuiz = new quizSchema({
    userId: req.user.id,
    documentId: id,
    questionCount,
    questions: generatedQuizWithAi,
  });
  await newQuiz.save();

  return res.status(200).json({
    message: "Quiz generated successfully",
    newQuiz,
  });
};

export default quizController;
