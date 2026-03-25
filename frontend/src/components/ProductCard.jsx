import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Icon3D from './Icon3D';
import './ProductCard.css';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product._id);

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <div className="pcard" style={{ animationDelay: `${index * 0.08}s` }}>
        <div className="pcard-image">
          <img
            src={product.image || `https://placehold.co/300x200/0d1f2d/00ffaa?text=🛒`}
            alt={product.name}
          />
          <span className="pcard-category">{product.category}</span>
          <button
            className={`pcard-wish ${wishlisted ? 'wishlisted' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              wishlisted ? removeFromWishlist(product._id) : addToWishlist(product);
            }}
          >
            <Icon3D type="heart" size={24} />
          </button>
        </div>
        <div className="pcard-body">
          <h3>{product.name}</h3>
          <p className="pcard-desc">{product.description?.slice(0, 50)}...</p>
          <div className="pcard-footer">
            <div className="pcard-price">
              <span className="price-amount">₹{product.price}</span>
              <span className="price-unit">/ {product.unit}</span>
            </div>
            <button
              className="add-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <Icon3D type="cart" size={20} />
              Add
            </button>
          </div>
          <div className="pcard-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;