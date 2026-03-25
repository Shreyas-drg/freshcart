import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Other'],
    },
    image: { type: String, default: '' },   // URL to product image
    stock: { type: Number, default: 0 },
    unit: { type: String, default: 'kg' },  // kg, litre, piece, etc.
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);