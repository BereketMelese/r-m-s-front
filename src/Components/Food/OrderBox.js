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
  tableId,
  setTableId,
}) => {
  const pointsRequired = totalPrice * pointMultiplier;

  const handleOrderClick = () => {
    if (!tableId) {
      return;
    }
    onOrder(tableId);
  };

  const handlePayWithPointsClick = () => {
    if (!tableId) {
      return;
    }
    onPayWithPoints(tableId);
  };
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
      <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>{" "}
      <div className="table-id-container">
        <label htmlFor="tableId">Table ID:</label>
        <input
          type="text"
          id="tableId"
          autoComplete="off"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          placeholder="Enter Table ID"
          required
        />
      </div>
      {payWithPointsEnabled ? (
        userPoints >= pointsRequired ? (
          <>
            <h3>Total Points Required: {pointsRequired}</h3>
            <button
              onClick={handlePayWithPointsClick}
              disabled={!tableId || userPoints < pointsRequired}
            >
              Pay with Points
            </button>
          </>
        ) : (
          <p>Not enough points to pay for the order.</p>
        )
      ) : (
        <p>Pay with Points is disabled.</p>
      )}
      <button onClick={handleOrderClick} disabled={!tableId}>
        Place Order
      </button>
    </div>
  );
};

export default OrderBox;
