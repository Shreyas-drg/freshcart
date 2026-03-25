import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../Context/CartContext';
import StarRating from '../components/StarRating';
import ReviewSection from '../components/ReviewSection';
import Icon3D from '../components/Icon3D';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get(`/products/${id}`).then(({ data }) => setProduct(data));
    API.get(`/reviews/${id}`).then(({ data }) => setAvgRating(data.avgRating));
  }, [id]);

  if (!product) return (
    <div className="pd-loading">
      <Icon3D type="success" size={80} />
      <p>Loading...</p>
    </div>
  );

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="pd-page">
        <div className="pd-layout">
          <div className="pd-image">
            <img src={product.image || `https://placehold.co/600x400/0d1f2d/00ffaa?text=🛒`} alt={product.name} />
            <span className="pd-category">{product.category}</span>
          </div>
          <div className="pd-info">
            <h1>{product.name}</h1>
            <div className="pd-rating">
              <StarRating value={Math.round(avgRating)} readonly size={22} />
              <span>{avgRating} avg rating</span>
            </div>
            <p className="pd-desc">{product.description}</p>
            <div className="pd-price">
              <span className="pd-amount">₹{product.price}</span>
              <span className="pd-unit">/ {product.unit}</span>
            </div>
            <p className={`pd-stock ${product.stock > 0 ? 'in' : 'out'}`}>
              {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
            </p>
            <button className="pd-add-btn" onClick={() => addToCart(product)}>
              <Icon3D type="cart" size={24} />
              Add to Cart
            </button>
            <ReviewSection productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;