import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Other'];

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Read category from URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setCategory(categoryParam);
    } else {
      setCategory('All');
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        if (search) params.search = search;
        const { data } = await API.get('/products', { params });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  return (
    <>
      <div className="home" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero">
          <div className="hero-tag">🌿 Farm Fresh • Daily Delivery</div>
          <h1>Your Daily <span className="hero-accent">Groceries</span><br />Delivered Fresh</h1>
          <p>Handpicked fruits, vegetables & more — straight to your door.</p>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for fruits, vegetables, dairy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>500+</strong><span>Products</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>2hr</strong><span>Delivery</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>100%</strong><span>Fresh</span></div>
          </div>
        </div>

        <div className="section-header">
          <h2>Browse Categories</h2>
        </div>
        <div className="categories">
          {categories.map((cat) => (
            <button key={cat} className={`cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="section-header">
          <h2>{category === 'All' ? 'All Products' : category}</h2>
          <span className="product-count">{products.length} items</span>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>🌿 No products found</p>
            <span>Try a different category or search term</span>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;