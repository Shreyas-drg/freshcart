import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Icon3D from './Icon3D';
import UserAvatar from './UserAvatar';
import SearchAutocomplete from './SearchAutocomplete';
import RainfrostLogo from './RainfrostLogo';
import './navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef();

  const handleLogout = () => { logout(); navigate('/'); };

  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const categories = [
    { name: 'Fruits', emoji: '🍎', desc: 'Fresh seasonal fruits' },
    { name: 'Vegetables', emoji: '🥦', desc: 'Farm fresh veggies' },
    { name: 'Dairy', emoji: '🥛', desc: 'Milk, cheese & more' },
    { name: 'Bakery', emoji: '🍞', desc: 'Breads & pastries' },
    { name: 'Beverages', emoji: '🧃', desc: 'Juices & drinks' },
    { name: 'Snacks', emoji: '🍿', desc: 'Chips & munchies' },
  ];

  return (
    <nav className={`navbar ${scrolled || megaOpen ? 'navbar-blur' : ''}`}>
      <div className="navbar-inner">

        <Link to="/" className="nav-logo-section">
          <RainfrostLogo />
          <div className="nav-branding">
            <span className="nav-brand-text">Fresh Cart</span>
          </div>
        </Link>

        <div className="mega-trigger-wrap" ref={megaRef}>
          <button
            className={`mega-trigger ${megaOpen ? 'active' : ''}`}
            onClick={() => setMegaOpen(!megaOpen)}
          >
            <span className="mega-trigger-label">Shop</span>
            <span className={`mega-chevron ${megaOpen ? 'open' : ''}`}>▾</span>
          </button>

          {megaOpen && (
            <div className="mega-menu">
              <div className="mega-menu-inner">
                <div className="mega-left">
                  <p className="mega-heading">Browse Categories</p>
                  <div className="mega-grid">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={`/?category=${cat.name}`}
                        className="mega-item"
                        onClick={() => setMegaOpen(false)}
                      >
                        <span className="mega-emoji">{cat.emoji}</span>
                        <div>
                          <strong>{cat.name}</strong>
                          <small>{cat.desc}</small>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mega-right">
                  <p className="mega-heading">Quick Links</p>
                  <Link to="/" className="mega-quick" onClick={() => setMegaOpen(false)}>
                    🏠 All Products
                  </Link>
                  {user && (
                    <>
                      <Link to="/orders" className="mega-quick" onClick={() => setMegaOpen(false)}>
                        📦 My Orders
                      </Link>
                      <Link to="/wishlist" className="mega-quick" onClick={() => setMegaOpen(false)}>
                        ❤️ Wishlist
                      </Link>
                      <Link to="/profile" className="mega-quick" onClick={() => setMegaOpen(false)}>
                        👤 My Profile
                      </Link>
                    </>
                  )}
                  {user?.isAdmin && (
                    <Link to="/admin" className="mega-quick admin-quick" onClick={() => setMegaOpen(false)}>
                      ⬡ Admin Panel
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Autocomplete */}
        <SearchAutocomplete />

        <div className="nav-right">
          {user ? (
            <>
              <Link to="/wishlist" className="nav-icon-btn cart-icon-wrap" title="Wishlist">
                <div className="icon-label-wrapper">
                  <Icon3D type="heart" size={44} />
                  <span className="icon-label">Wishlist</span>
                </div>
                {wishlist.length > 0 && (
                  <span className="cart-badge" style={{ background: '#ff4d6d' }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="nav-icon-btn cart-icon-wrap" title="Cart">
                <div className="icon-label-wrapper">
                  <Icon3D type="cart" size={44} />
                  <span className="icon-label">Cart</span>
                </div>
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>
              <Link to="/profile" className="nav-icon-btn profile-icon-btn" title="Profile">
                <div className="icon-label-wrapper">
                  <UserAvatar name={user?.name} size={44} />
                  <span className="icon-label">Profile</span>
                </div>
              </Link>
              <button className="nav-logout" onClick={handleLogout} title="Logout">
                <div className="icon-label-wrapper">
                  <Icon3D type="logout" size={44} />
                  <span className="icon-label">Logout</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link-plain">Login</Link>
              <Link to="/register" className="nav-get-started">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;