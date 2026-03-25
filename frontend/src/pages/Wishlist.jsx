import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import Icon3D from '../components/Icon3D';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0)
    return (
      <div className="empty-wishlist">
        <Icon3D type="heart" size={80} />
        <h2>Your wishlist is empty</h2>
        <p>Save products you love!</p>
      </div>
    );

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="wishlist-page">
        <h2>My Wishlist <span className="wl-count">{wishlist.length} items</span></h2>
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product._id} className="wl-card">
              <img src={product.image || `https://placehold.co/300x200/0d1f2d/00ffaa?text=🛒`} alt={product.name} />
              <div className="wl-body">
                <h3>{product.name}</h3>
                <p className="wl-price">₹{product.price} / {product.unit}</p>
                <div className="wl-actions">
                  <button className="wl-add" onClick={() => { addToCart(product); removeFromWishlist(product._id); }}>
                    Add to Cart
                  </button>
                  <button className="wl-remove" onClick={() => removeFromWishlist(product._id)}>
                    <Icon3D type="heart" size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;