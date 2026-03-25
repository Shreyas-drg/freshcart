import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authroutes.js';
import productRoutes from './routes/productroutes.js';
import orderRoutes from './routes/orderroutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
// app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/', (req, res) => res.send('FreshCart API is running ✅'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));