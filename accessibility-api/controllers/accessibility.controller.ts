import { Request, Response } from 'express';
import { analyzeAccessibility } from '../services/accessibility.service';
import { unlink } from 'fs/promises';

/**
 * Controller for handling accessibility file uploads.
 */
export const uploadAndAnalyze = async (req: Request, res: Response) => {
  try {
    // Ensure file exists (the middleware should already check).
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No file uploaded. Please upload an HTML file.' });
    }

    const filePath = req.file.path;
    
    // Analyze the uploaded file.
    const analysisResult = await analyzeAccessibility(filePath);
    
    // Clean up: delete the file after processing.
    await unlink(filePath);

    // Return the analysis result, including OpenAI recommendations.
    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error('Error during accessibility analysis:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
