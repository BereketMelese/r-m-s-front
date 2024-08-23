import React from "react";

const FoodItem = ({ food, onClick, isAdmin, onUpdate, onDelete }) => {
  return (
    <div className="food-item" onClick={() => !isAdmin && onClick()}>
      <img src={food.image} alt={food.name} className="food-item-image" />
      <h4>{food.name}</h4>
      <p>{food.price.toFixed(2)}</p>
      {isAdmin && (
        <div className="food-item-admin">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
