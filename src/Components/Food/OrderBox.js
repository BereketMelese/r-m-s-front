import React from "react";
import "./OrderBox.css";

const OrderBox = ({
  items,
  onRemoveItem,
  onOrder,
  totalPrice,
  userPoints,
  onPayWithPoints,
  pointMultiplier,
  payWithPointsEnabled,
}) => {
  const pointsRequired = totalPrice * pointMultiplier;
  return (
    <div className="order-box">
      <h3>Your Order</h3>
      <ul>
        {items.map((item, index) => (
          <li key="item.index">
            <span>
              {item.name} - ${item.price.toFixed(2)}
              <span className="multiply-symbol">x</span>
              <span className="quantity">{item.quantity}</span> = $
              {(item.price * item.quantity).toFixed(2)}
            </span>
            <button onClick={() => onRemoveItem(index)} className="one">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
      {payWithPointsEnabled ? (
        userPoints >= pointsRequired ? (
          <>
            <h3>Total Points Required: {pointsRequired}</h3>
            <button onClick={onPayWithPoints}>Pay with Points</button>
          </>
        ) : (
          <p>Not enough points to pay for the order.</p>
        )
      ) : (
        <p>Pay with Points is disabled.</p>
      )}
      <button onClick={onOrder}>Place Order</button>
    </div>
  );
};

export default OrderBox;
