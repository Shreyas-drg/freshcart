import { useState, useEffect } from 'react';
import API from '../api/axios';
import './Admin.css';

const categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Other'];

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '', description: '', price: '',
    category: 'Fruits', stock: '', unit: 'kg', image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchProducts = () => API.get('/api/products').then(({ data }) => setProducts(data));
  useEffect(() => { fetchProducts(); }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return '';
    const formData = new FormData();
    formData.append('image', imageFile);
    const { data } = await API.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMsg('');
    try {
      const imageUrl = await uploadImage();
      await API.post('/api/products', { ...form, image: imageUrl });
      setMsg('Product added! ✅');
      setForm({ name: '', description: '', price: '', category: 'Fruits', stock: '', unit: 'kg', image: '' });
      setImageFile(null);
      setImagePreview('');
      fetchProducts();
    } catch (err) {
      const apiMsg = err.response?.data?.message;
      setMsg(apiMsg || 'Error adding product');
      console.error('Add product failed', err.response || err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await API.delete(`/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="admin-page">
        <h2>Admin Panel</h2>
        <div className="admin-layout">
          <div className="add-product">
            <h3>Add New Product</h3>
            {msg && <p className="add-msg">{msg}</p>}
            <form onSubmit={handleSubmit}>
              <input placeholder="Product name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input placeholder="Description" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <input type="number" placeholder="Price (₹)" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <input type="number" placeholder="Stock" value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                {['kg', 'litre', 'piece', 'dozen', 'pack'].map((u) => <option key={u}>{u}</option>)}
              </select>

              <div className="image-upload-box">
                <label htmlFor="img-input" className="image-upload-label">
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" className="img-preview" />
                    : <div className="upload-placeholder">
                        <span>📷</span>
                        <p>Click to upload image</p>
                        <small>JPG, PNG, WEBP</small>
                      </div>
                  }
                </label>
                <input id="img-input" type="file" accept="image/*"
                  onChange={handleImageChange} style={{ display: 'none' }} />
              </div>

              <button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Add Product'}
              </button>
            </form>
          </div>

          <div className="product-list">
            <h3>All Products ({products.length})</h3>
            {products.map((p) => (
              <div key={p._id} className="admin-product-item">
                <div className="admin-product-info">
                  {p.image && <img src={p.image} alt={p.name} className="admin-thumb" />}
                  <div>
                    <strong>{p.name}</strong>
                    <span>{p.category} • ₹{p.price} • Stock: {p.stock}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;