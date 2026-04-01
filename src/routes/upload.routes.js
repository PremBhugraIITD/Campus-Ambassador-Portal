import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import UploadController from '../controllers/upload.controller.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only PNG and JPG files are allowed'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  // Limit file size to 5MB
});

const router = Router();

router.post('/upload-file', upload.array('file',20), UploadController.uploadMultipleFilesToTask);
// router.get('/uploaded-files', UploadController.getAllUploadedFiles);

export default router;
