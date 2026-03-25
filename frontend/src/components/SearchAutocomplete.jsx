import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Icon3D from './Icon3D';
import './SearchAutocomplete.css';

const SearchAutocomplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef();
  const debounceRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced search — waits 300ms after user stops typing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await API.get('/products', { params: { search: query } });
        setResults(data.slice(0, 6)); // max 6 suggestions
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (product) => {
    setQuery('');
    setShowDropdown(false);
    navigate(`/product/${product._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setShowDropdown(false);
      navigate(`/?search=${query}`);
      setQuery('');
    }
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-wrap" ref={wrapRef}>
      <div className="search-input-wrap">
        <div className="search-icon-wrap">
          <Icon3D type="search" size={20} />
        </div>
        <input
          type="text"
          placeholder="Search groceries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          className="search-input"
          autoComplete="off"
        />
        {loading && <span className="search-spinner">⟳</span>}
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); setShowDropdown(false); }}>
            ✕
          </button>
        )}
      </div>

      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          <p className="search-dropdown-label">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </p>
          {results.map((product) => (
            <div
              key={product._id}
              className="search-item"
              onClick={() => handleSelect(product)}
            >
              <img
                src={product.image || `https://placehold.co/48x48/0d1f2d/00ffaa?text=🛒`}
                alt={product.name}
              />
              <div className="search-item-info">
                <strong>{highlightMatch(product.name, query)}</strong>
                <span>{product.category} • ₹{product.price}/{product.unit}</span>
              </div>
              <span className="search-item-arrow">→</span>
            </div>
          ))}
          <div className="search-footer" onClick={() => { navigate(`/?search=${query}`); setShowDropdown(false); setQuery(''); }}>
            See all results for "<strong>{query}</strong>"
          </div>
        </div>
      )}

      {showDropdown && results.length === 0 && !loading && query && (
        <div className="search-dropdown">
          <p className="search-no-results">😕 No products found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

// Highlight matching text in product name
const highlightMatch = (text, query) => {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
};

export default SearchAutocomplete;