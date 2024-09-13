import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import "./EditFoodModal.css";

const EditFoodModal = ({ food, closeModal, setFoods }) => {
  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState(food.price);
  const [image, setImage] = useState(food.image);
  const { sendRequest } = useHttpClient();

  // Lock background scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedFood = await sendRequest(
        `http://localhost:5000/api/food/${food._id}`,
        "PUT",
        JSON.stringify({
          name,
          price,
          image,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setFoods((prevFoods) =>
        prevFoods.map((f) => (f._id === food._id ? updatedFood : f))
      );
      closeModal(); // Close the modal after success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Food</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">Save Changes</button>
        </form>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditFoodModal;
