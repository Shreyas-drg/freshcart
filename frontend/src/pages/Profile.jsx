import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icon3D from '../components/Icon3D';
import UserAvatar from '../components/UserAvatar';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">
            <UserAvatar name={user?.name} size={120} />
          </div>
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <div className="profile-badge">
            {user.isAdmin ? '⬡ Admin' : '🛒 Customer'}
          </div>
          <div className="profile-stats">
            <div className="pstat" onClick={() => navigate('/orders')}>
              <Icon3D type="orders" size={36} />
              <span>My Orders</span>
            </div>
            <div className="pstat" onClick={() => navigate('/wishlist')}>
              <Icon3D type="heart" size={36} />
              <span>Wishlist</span>
            </div>
            <div className="pstat" onClick={() => navigate('/cart')}>
              <Icon3D type="cart" size={36} />
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;