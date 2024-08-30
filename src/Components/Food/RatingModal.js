import React, { useState } from "react";
import "./RatingModal.css";

const RatingModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit(rating || 5);
    onClose();
  };

  const handleClose = () => {
    if (rating === 0) {
      onSubmit(5);
    }
    onClose();
  };
  return (
    <div className="rating-modal">
      <div className="modal-content">
        <h2>Rate Our Service</h2>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit Rating</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default RatingModal;
