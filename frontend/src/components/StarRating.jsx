import { useState } from 'react';
import './StarRating.css';

const StarRating = ({ value = 0, onChange, readonly = false, size = 24 }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${(hovered || value) >= star ? 'active' : ''} ${readonly ? 'readonly' : ''}`}
          style={{ fontSize: size }}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange?.(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;