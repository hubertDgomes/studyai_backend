import documentsSchema from "../models/documentsSchema.js";
import questionSchema from "../models/questionSchema.js";
import generateAnswer from "../services/questions.js";

const answerController = async (req, res) => {

    const {id} = req.params;

    const checkDocument = await documentsSchema.findById(id);
    if (!checkDocument) {
        return res.status(404).json({
            message: "Document not found",
        });
    }

    const { question } = req.body;
    if (!question) {
        return res.status(400).json({
            message: "Question is required",
        });
    }

    const generatedAnswerWithAi = await generateAnswer({ question, documentText : checkDocument.extractedText });

    const newAnswer = new questionSchema({
        userId: req.user.id,
        documentId: id,
        question,
        answer: generatedAnswerWithAi.answer,
    });
    await newAnswer.save();

    return res.status(200).json({
        message: "Answer generated successfully",
        newAnswer,
    });
}

export default answerController;