import { useCart } from '../Context/CartContext';
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [address, setAddress] = useState('');
  const [msg, setMsg] = useState('');
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!address) return setMsg('Please enter a delivery address');
    setPlacing(true);
    try {
      await API.post('/api/orders', {
        items: cartItems.map((i) => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        totalPrice,
        deliveryAddress: address,
      });
      clearCart();
      setMsg('Order placed! 🎉');
      setTimeout(() => navigate('/api/orders'), 2000);
    } catch {
      setMsg('Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0)
    return (
      <div className="empty-cart">
        <div className="empty-cart-inner">
          <span>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some fresh groceries to get started!</p>
        </div>
      </div>
    );

  return (
    <div className="cart-page">
      <h2>Your Cart <span className="cart-count">{cartItems.length} items</span></h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image || `https://placehold.co/80x80/0d1f2d/00ffaa?text=🥦`} alt={item.name} />
              <div className="ci-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} / {item.unit}</p>
              </div>
              <div className="ci-controls">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <span className="ci-total">₹{item.price * item.quantity}</span>
              <button className="ci-remove" onClick={() => removeFromCart(item._id)}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₹{totalPrice}</span></div>
          <div className="summary-row"><span>Delivery</span><span className="free">FREE</span></div>
          <div className="summary-row total"><span>Total</span><span>₹{totalPrice}</span></div>
          <input placeholder="📍 Delivery address" value={address}
            onChange={(e) => setAddress(e.target.value)} />
          <button className="place-order-btn" onClick={placeOrder} disabled={placing}>
            {placing ? 'Placing...' : 'Place Order →'}
          </button>
          {msg && <p className="order-msg">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;