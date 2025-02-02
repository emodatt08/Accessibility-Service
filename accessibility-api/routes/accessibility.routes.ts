import { Router } from 'express';
import multer from 'multer';
import { uploadAndAnalyze } from '../controllers/accessibility.controller';
import { fileUploadValidation } from '../validations/fileUpload.validation';

// Set up Multer for file uploads. Files will be stored in a temporary folder.
const upload = multer({ dest: 'uploads/' });

const router = Router();

// The middleware chain: multer -> fileUploadValidation -> controller.
router.post(
  '/analyze',
  upload.single('file'),
  fileUploadValidation,
  uploadAndAnalyze
);

export default router;
