import React, { useState } from "react";
import "./FoodModal.css";
const FoodModal = ({ show, handleClose, food, handleConfirmOrder }) => {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    console.log(`Order confermed: ${quantity} of ${food.name}`);
    handleConfirmOrder(food, quantity);
    handleClose();
  };
  return (
    <div className="modal-overlay" show={show} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order {food.name}</h2>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="food-image">
            <img src={food.image} alt={food.name} />
          </div>
          <p>Price: ${food.price}</p>
          <p>Points: {food.points}</p>
          <div className="quantity-input">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="confirm-button"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
