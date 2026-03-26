import { useEffect, useState } from 'react';
import API from '../api/axios';
import './Orders.css';

const statusColor = { pending: '#f4a261', processing: '#457b9d', delivered: '#2d6a4f', cancelled: '#ff6b6b' };

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/api/orders/my').then(({ data }) => setOrders(data));
  }, []);

  if (orders.length === 0)
    return <div className="empty-orders"><h2>No orders yet 📦</h2></div>;

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span>Order #{order._id.slice(-6).toUpperCase()}</span>
            <span className="status" style={{ background: statusColor[order.status] }}>
              {order.status}
            </span>
          </div>
          <div className="order-items">
            {order.items.map((item, i) => (
              <p key={i}>{item.name} × {item.quantity} — ₹{item.price * item.quantity}</p>
            ))}
          </div>
          <div className="order-footer">
            <span>📍 {order.deliveryAddress}</span>
            <span>Total: ₹{order.totalPrice}</span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Orders;