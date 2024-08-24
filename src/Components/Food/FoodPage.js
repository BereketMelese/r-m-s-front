import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Shared/Components/Context/Auth-context";
import { useHttpClient } from "../Shared/hooks/http-hooks";
import OrderBox from "./OrderBox";
import FoodItem from "./FoodItem";
import "./FoodPage.css";
// import { useParams } from "react-router-dom";

const FoodPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [foods, setFoods] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [editingFoods, setEditingFoods] = useState(null);
  //   const id = useParams().id;

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
    fetchFoods();
  }, [sendRequest]);

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
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setOrderItems([]);
      alert("Order placed succesfully");
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
      console.log(id);
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
          <OrderBox
            items={orderItems}
            onRemoveItem={handleRemoveItem}
            onOrder={handleOrder}
            totalPrice={totalPrice}
          />
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
    </div>
  );
};

export default FoodPage;
