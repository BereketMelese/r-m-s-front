import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Shared/Components/Context/Auth-context";
import { useHttpClient } from "../Shared/hooks/http-hooks";
import OrderBox from "./OrderBox";
import FoodItem from "./FoodItem";
import RatingModal from "./RatingModal";
import "./FoodPage.css";

const FoodPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [foods, setFoods] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [editingFoods, setEditingFoods] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/food"
        );
        setFoods(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserPoints = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setUserPoints(responseData.points);
        setShowModal(responseData.hasRated);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoods();
    if (auth.isLoggedIn) {
      fetchUserPoints();
    }
  }, [sendRequest, auth.isLoggedIn, auth.userId, auth.token]);

  const handleFoodClick = (food) => {
    if (!auth.isLoggedIn) {
      alert("Please log in to order food.");
      return;
    }

    if (auth.role !== "admin" && auth.role !== "chef") {
      setOrderItems((prevItems) => [...prevItems, food]);
    }
  };

  const handleOrder = async () => {
    const tableId = prompt(
      "Please enter the table ID you will get from scanning the Qr Code:"
    );
    if (!tableId) {
      alert("Table ID is required to place an order.");
    }

    try {
      const orderItemNames = orderItems.map((item) => item.name);
      await sendRequest(
        `http://localhost:5000/api/order?tableId=${tableId}`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          foods: orderItemNames,
          totalPrice: totalPrice,
          usePoints: false,
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setOrderItems([]);
      alert("Order placed succesfully");
      if (showModal === false) {
        setTimeout(() => {
          setShowRatingModal(true);
        }, 30000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayWithPoints = async () => {
    const tableId = prompt(
      "Please enter the table ID you will get from scanning the QR Code:"
    );
    if (!tableId) {
      alert("Table ID is required to place an order.");
      return;
    }

    try {
      const orderItemNames = orderItems.map((item) => item.name);
      await sendRequest(
        `http://localhost:5000/api/order?tableId=${tableId}`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          foods: orderItemNames,
          totalPrice: totalPrice,
          usePoints: true,
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setOrderItems([]);
      alert("Order placed successfully using points");
      if (!showModal) {
        setTimeout(() => {
          setShowRatingModal(true);
        }, 10000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = (index) => {
    setOrderItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleUpdatedFood = async () => {
    try {
      const id = editingFoods._id;
      await sendRequest(
        `http://localhost:5000/api/food/${id}`,
        "PATCH",
        JSON.stringify({
          name: editingFoods.name,
          image: editingFoods.image,
          price: editingFoods.price,
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setEditingFoods(null);
      alert("Food updated Succesfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletedFood = async (foodId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/food/${foodId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
      alert("Food was deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);

  const groupedFoods = foods.reduce((acc, food) => {
    const categoryName = food.category.name;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(food);
    return acc;
  }, {});

  const handleRatingSubmit = async (rating) => {
    try {
      await sendRequest(
        "http://localhost:5000/api/users/rate",
        "POST",
        JSON.stringify({
          userId: auth.userId,
          rating,
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      alert("Thank you for your rating!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="food-page">
      <div className="food-list">
        {isLoading && <p>Loading...</p>}
        {Object.keys(groupedFoods).map((category) => (
          <div key={category} className="food-category">
            <h2 className="category-title">{category}</h2>
            <div className="food-items-wrap">
              {groupedFoods[category].map((food) => (
                <FoodItem
                  key={food._id}
                  food={food}
                  onClick={() => handleFoodClick(food)}
                  isAdmin={auth.role === "admin"}
                  onUpdate={() => setEditingFoods(food)}
                  onDelete={() => handleDeletedFood(food._id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {auth.isLoggedIn && auth.role !== "admin" && auth.role !== "chef" && (
          <div className="sticky">
            <div className="users-poins-container">
              <h1>Your Points: {userPoints}</h1>
            </div>
            <OrderBox
              items={orderItems}
              onRemoveItem={handleRemoveItem}
              onOrder={handleOrder}
              totalPrice={totalPrice}
              userPoints={userPoints}
              onPayWithPoints={handlePayWithPoints}
            />
          </div>
        )}
      </div>
      {auth.role === "admin" && editingFoods && (
        <div className="edit-food">
          <h3>Edit Food Item</h3>
          <input
            type="text"
            value={editingFoods.name}
            onChange={(e) =>
              setEditingFoods({ ...editingFoods, name: e.target.value })
            }
          />
          <input
            type="number"
            value={editingFoods.price}
            onChange={(e) =>
              setEditingFoods({ ...editingFoods, price: e.target.value })
            }
          />
          <input
            type="text"
            value={editingFoods.image}
            onChange={(e) =>
              setEditingFoods({ ...editingFoods, image: e.target.value })
            }
          />
          <button onClick={handleUpdatedFood}>Update Food</button>
          <button onClick={() => setEditingFoods(null)}>Cancel</button>
        </div>
      )}
      {showRatingModal && (
        <RatingModal
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};

export default FoodPage;
