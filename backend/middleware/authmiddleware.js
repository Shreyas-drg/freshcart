import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Protect routes — only logged in users can access
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // attach user to request
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// Admin-only routes
export const adminOnly = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  res.status(403).json({ message: 'Admin access only' });
};