import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import "react-toastify/dist/ReactToastify.css";
import "../../Food/TosdtContainer.css";
import { toast, ToastContainer } from "react-toastify";
import "./FoodDashboard.css";

const FoodDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/food"
        );
        setFoods(responseData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoods();
  }, [sendRequest]);

  const deleteFood = async (foodId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/food/${foodId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== foodId));
      toast.success("Food was deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (food) => {
    setSelectedFood(food);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedFood(null);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedFood = await sendRequest(
        `http://localhost:5000/api/food/${selectedFood._id}`,
        "PATCH",
        JSON.stringify({
          name: selectedFood.name,
          price: selectedFood.price,
          image: selectedFood.image,
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === selectedFood._id ? updatedFood : food
        )
      );
      closeEditModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Food Management</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="food-grid">
          {foods.map((food) => (
            <div key={food._id} className="food-card">
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>Price: ${food.price}</p>
                <p>Points: {food.points}</p>
                <p>Category: {food.category?.name}</p>
              </div>
              <div className="food-actions">
                <button onClick={() => openEditModal(food)} className="edit">
                  Edit
                </button>
                <button onClick={() => deleteFood(food._id)} className="delete">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="edit-modal">
          <form onSubmit={handleEditSubmit} className="edit-modal-content">
            <h2>Edit Food</h2>
            <label>Name</label>
            <input
              type="text"
              value={selectedFood.name}
              onChange={(e) =>
                setSelectedFood({ ...selectedFood, name: e.target.value })
              }
            />
            <label>Price</label>
            <input
              type="number"
              value={selectedFood.price}
              onChange={(e) =>
                setSelectedFood({ ...selectedFood, price: e.target.value })
              }
            />
            <label>Image URL</label>
            <input
              type="text"
              value={selectedFood.image}
              onChange={(e) =>
                setSelectedFood({ ...selectedFood, image: e.target.value })
              }
            />
            <button type="submit" className="save">
              Save Changes
            </button>
            <button type="button" onClick={closeEditModal} className="cancel">
              Cancel
            </button>
          </form>
        </div>
      )}
      <ToastContainer position="top-right" className="toast-container" />
    </div>
  );
};

export default FoodDashboard;
