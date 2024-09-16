import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Shared/Components/Context/Auth-context";
import { useHttpClient } from "../Shared/hooks/http-hooks";
import OrderBox from "./OrderBox";
import FoodItem from "./FoodItem";
import RatingModal from "./RatingModal";
import Header from "../Shared/Components/Header";
import Footer from "../Shared/Components/Footer";
import Modal from "./Modal";
import FoodModal from "./FoodModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TosdtContainer.css";

const FoodPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [foods, setFoods] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [tableId, setTableId] = useState("");
  const [settings, setSettings] = useState({
    payWithPointsEnabled: true,
    pointMultiplier: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const handleOpenModal = (food) => {
    console.log("Opening modal with food:", food);
    setSelectedFood(food);
    setShowFoodModal(true);
  };

  const handleCloseModal = () => {
    setShowFoodModal(false);
    setSelectedFood(null);
  };

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

    const fetchSettings = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/points/settings/",
          "GET"
        );
        setSettings(responseData);
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFoods();
    fetchSettings();
    if (auth.isLoggedIn) {
      fetchUserPoints();
    }
  }, [sendRequest, auth.isLoggedIn, auth.userId, auth.token]);

  const handleFoodClick = (food, quantity) => {
    if (!auth.isLoggedIn) {
      navigate("/auth");
      return;
    }

    if (auth.role !== "admin" && auth.role !== "chef") {
      setOrderItems((prevItems) => {
        const existingItem = prevItems.find((item) => item._id === food._id);

        if (existingItem) {
          return prevItems.map((item) =>
            item._id === food._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { ...food, quantity }];
      });
    }
  };

  const handleOrder = async (tableId) => {
    try {
      const orderItemWithQuantity = orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
      }));
      await sendRequest(
        `http://localhost:5000/api/order?tableId=${tableId}`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          foods: orderItemWithQuantity,
          totalPrice: totalPrice,
          usePoints: false,
        }),
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setOrderItems([]);
      setTableId("");
      toast.success("Order placed successfully");

      if (showModal === false) {
        setTimeout(() => {
          setShowRatingModal(true);
        }, 30000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayWithPoints = async (tableId) => {
    if (!tableId) {
      toast.error("Table ID is required to place an order.");
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
      setTableId("");
      toast.success("Order placed successfully using points");

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

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
      toast.success("Thank you for your rating!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingModalClose = () => {
    handleRatingSubmit(5);
    setShowRatingModal(false);
  };

  return (
    <div className="container-xxl bg-white p-0">
      <Header page="Menu" />
      <div className="food-list">
        {isLoading && <p>Loading...</p>}
        {Object.keys(groupedFoods).map((category) => (
          <>
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                Food Menu
              </h5>
              <h1 className="mb-5">Most Popular Items</h1>
            </div>
            <div
              className="tab-class text-center wow fadeInUp"
              data-wow-delay="0.1s"
              key={category}
            >
              <div className="nav nav-pills d-inline-flex justify-content-center mb-5">
                <div className="ps-3">
                  <h2 className="mt-n1 mb-0 text-primary">{category}</h2>
                </div>
              </div>
              <div className="">
                {groupedFoods[category].map((food) => (
                  <>
                    <FoodItem
                      key={food._id}
                      food={food}
                      onClick={() => handleOpenModal(food)}
                    />
                    {showFoodModal && (
                      <FoodModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        food={selectedFood}
                        handleConfirmOrder={handleFoodClick}
                      />
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
      <div>
        {auth.isLoggedIn && auth.role !== "admin" && auth.role !== "chef" && (
          <div className="sticky">
            <button className="fixed-button" onClick={openModal}>
              +
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <h2>Order Details</h2>
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
                pointMultiplier={settings.pointMultiplier}
                payWithPointsEnabled={settings.payWithPointsEnabled}
                tableId={tableId}
                setTableId={setTableId}
              />
            </Modal>
          </div>
        )}
      </div>
      {showRatingModal && (
        <RatingModal
          onClose={handleRatingModalClose}
          onSubmit={handleRatingSubmit}
        />
      )}
      <Footer />
      <ToastContainer position="top-right" className="toast-container" />
    </div>
  );
};

export default FoodPage;
