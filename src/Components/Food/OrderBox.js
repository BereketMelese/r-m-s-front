import React from "react";

const OrderBox = ({
  items,
  onRemoveItem,
  onOrder,
  totalPrice,
  userPoints,
  onPayWithPoints,
}) => {
  const pointsRequired = totalPrice * 6;
  return (
    <div className="order-box">
      <h3>Your Order</h3>
      <ul>
        {items.map((item, index) => (
          <li key="item.index">
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button onClick={() => onRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
      <h3>Total Points Required: {pointsRequired}</h3>
      {userPoints >= pointsRequired ? (
        <button onClick={onPayWithPoints}>Pay with Points</button>
      ) : (
        <p>Not enough points to pay for the order.</p>
      )}
      <button onClick={onOrder}>Place Order</button>
    </div>
  );
};

export default OrderBox;
