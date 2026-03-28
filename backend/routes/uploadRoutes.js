import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect, adminOnly } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file received' });
    }
    res.json({ url: req.file.path });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message || 'Image upload failed' });
  }
});

export default router;