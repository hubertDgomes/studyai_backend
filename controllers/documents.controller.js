import { PDFParse } from "pdf-parse";
import generateDocsSummury from "../services/summary.js";
import documentsSchema from "../models/documentsSchema.js";

const documentController = async (req, res) => {
  try {
    const docsFile = req.file;
    if (!docsFile) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    const parser = new PDFParse({ data: Uint8Array.from(docsFile.buffer) });
    const docsResult = await parser.getText();
    const docsText = docsResult?.text || "";

    const generatedSummuryWithAi = await generateDocsSummury({
      pdfText: docsText,
    });

    const newDocs = new documentsSchema({
      userId: req.user.id,
      extractedText: docsText,
      ...generatedSummuryWithAi,
    });
    await newDocs.save();

    return res.status(200).json({
      message: "Summurized successfully done",
      newDocs,
    });
  } catch (err) {
    console.error("Document upload failed:", err);
    return res.status(500).json({
      message: "Failed to process the PDF",
    });
  }
};

const getAllDocumentsController = async (req, res) => {
  const getDocs = await documentsSchema.find({ userId: req.user.id }).select("-extractedText").sort({createdAt : -1});
  if (!getDocs) {
    return res.status(404).json({ message: "The docs not found" });
  }
  return res.status(200).json({ getDocs });
};

const getDocsById = async (req , res) => {
  const {id} = req.params
  const getDocs = await documentsSchema.findById(id).select("-extractedText")
  if(!getDocs){
     return res.status(404).json({ message: "The docs not found" });
  }
  return res.status(200).json({ getDocs });
}

export default { documentController, getAllDocumentsController , getDocsById};
