import { Request, Response, NextFunction } from 'express';

// Middleware to check if a file was uploaded.
export const fileUploadValidation = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded. Please upload an HTML file.' });
  }
  // WIP: validate file mimetype.
  next();
};
