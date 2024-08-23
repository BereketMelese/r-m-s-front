import React from "react";

const OrderBox = ({ items, onRemoveItem, onOrder, totalPrice }) => {
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
      <button onClick={onOrder}>Place Order</button>
    </div>
  );
};

export default OrderBox;

// import React from "react";

// const OrderBox = ({ items, onRemoveItem, onOrder, totalPrice }) => {
//   return (
//     <div className="order-box">
//       <h3>Your Order</h3>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}> {/* Assuming each item has a unique `id` */}
//             <span>
//               {item.name} - ${item.price.toFixed(2)}
//             </span>
//             <button onClick={() => onRemoveItem(item.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//       <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
//       <button onClick={onOrder}>Place Order</button>
//     </div>
//   );
// };

// export default OrderBox;
