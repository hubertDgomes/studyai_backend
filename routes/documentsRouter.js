import express from 'express'
import upload from '../middleware/fileMiddleware.js'
import authUser from '../middleware/authMiddleware.js'
import documentController from '../controllers/documents.controller.js'
import answerController from '../controllers/answer.controller.js'
const documentRouter = express.Router()


documentRouter.post("/docsupload", authUser , upload.single("extractedText"), documentController)
documentRouter.post("/questions/:id", authUser, answerController)


export default documentRouter
