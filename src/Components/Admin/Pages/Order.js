import React, { useEffect, useState } from "react";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import { useContext } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import "react-toastify/dist/ReactToastify.css";
import "../../Food/TosdtContainer.css";
import "./order.css";
import { toast, ToastContainer } from "react-toastify";

const Order = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [orders, setOrders] = useState([]);
  const [selectOrder, setSelectOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/order"
        );
        setOrders(responseData);
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [sendRequest]);

  const handleStatusChange = async (orderId) => {
    try {
      await sendRequest(
        "http://localhost:5000/api/order/status",
        "PATCH",
        JSON.stringify({
          orderId,
          status: newStatus,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );

      setSelectOrder(null);
      toast.success("Order status updated successfully");
      const responseData = await sendRequest("http://localhost:5000/api/order");
      setOrders(responseData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };
  const renderStatusOptions = () => {
    if (selectOrder.status === "pending") {
      return <option value="in_progress">In Progress</option>;
    } else if (selectOrder.status === "in_progress") {
      return <option value="completed">Completed</option>;
    }
    return null;
  };
  return (
    <div className="first">
      <h1>Manage Orders</h1>
      {isLoading && <p>Loading</p>}
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User</th>
            <th>Foods</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Table Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.username}</td>
              <td>
                {order.foods
                  .map((food) => `${food.foodId?.name} (x${food.quantity})`)
                  .join(", ")}
              </td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.table && order.table.tableId}</td>
              <td>
                <button
                  onClick={() => setSelectOrder(order)}
                  disabled={order.status === "completed"}
                >
                  Change Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectOrder && (
        <div className="second">
          <select
            onChange={(e) => setNewStatus(e.target.value)}
            value={newStatus}
          >
            <option value="">Select Status</option>
            {renderStatusOptions()}
          </select>
          <button
            onClick={() => handleStatusChange(selectOrder._id)}
            disabled={!newStatus}
          >
            Update Status
          </button>
          <button onClick={() => setSelectOrder(null)}>Cancel</button>
        </div>
      )}
      <ToastContainer position="top-right" className="toast-container" />
    </div>
  );
};

export default Order;
