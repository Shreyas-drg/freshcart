import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), (req, res) => {
  try {
    res.json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed' });
  }
});

export default router;