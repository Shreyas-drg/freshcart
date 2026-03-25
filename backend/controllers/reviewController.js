import Review from '../models/Review.js';

// POST /api/reviews/:productId
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const existing = await Review.findOne({
      user: req.user._id,
      product: req.params.productId,
    });

    if (existing) {
      // Update existing review
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.json(existing);
    }

    const review = await Review.create({
      user: req.user._id,
      product: req.params.productId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/reviews/:productId
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const avgRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({ reviews, avgRating: avgRating.toFixed(1), total: reviews.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/reviews/:reviewId
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};