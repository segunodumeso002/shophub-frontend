import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/', authenticate, isAdmin, upload.single('image'), uploadImage);

export default router;
