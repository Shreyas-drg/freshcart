import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../Context/AuthContext';
import StarRating from './StarRating';
import Icon3D from './Icon3D';
import './ReviewSection.css';

const ReviewSection = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/api/reviews/${productId}`);
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      setMsg('Unable to load reviews right now');
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { fetchReviews(); }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return setMsg('Please select a rating');
    try {
      await API.post(`/api/reviews/${productId}`, { rating, comment });
      setMsg('Review submitted! ✅');
      setRating(0);
      setComment('');
      setShowForm(false);
      fetchReviews();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error submitting review');
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await API.delete(`/api/reviews/${reviewId}`);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <div className="review-summary">
          <div className="avg-rating">
            <span className="avg-number">{avgRating}</span>
            <div>
              <StarRating value={Math.round(avgRating)} readonly size={20} />
              <small>{total} review{total !== 1 ? 's' : ''}</small>
            </div>
          </div>
        </div>
        {user && (
          <button className="write-review-btn" onClick={() => setShowForm(!showForm)}>
            <Icon3D type="star" size={20} />
            {showForm ? 'Cancel' : 'Write Review'}
          </button>
        )}
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <p>Your Rating</p>
          <StarRating value={rating} onChange={setRating} size={32} />
          <textarea
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={3}
          />
          <button type="submit" className="submit-review-btn">Submit Review</button>
          {msg && <p className="review-msg">{msg}</p>}
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-top">
                <div className="reviewer-info">
                  <Icon3D type="user" size={28} />
                  <div>
                    <strong>{review.user?.name}</strong>
                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                  </div>
                </div>
                <div className="review-right">
                  <StarRating value={review.rating} readonly size={16} />
                  {user?._id === review.user?._id && (
                    <button className="delete-review" onClick={() => handleDelete(review._id)}>✕</button>
                  )}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;