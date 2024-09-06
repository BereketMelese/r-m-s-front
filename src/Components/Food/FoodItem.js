import React from "react";

const FoodItem = ({ food, onClick, isAdmin, onUpdate, onDelete }) => {
  return (
    <div className="tab-content">
      <div className="row g-4">
        <div className="col-lg-12">
          <div
            className="d-flex align-items-center m-4"
            onClick={() => !isAdmin && onClick()}
          >
            <img
              src={food.image}
              alt={food.name}
              className="flex-shrink-0 img-fluid rounded"
              style={{ width: "100px" }}
            />
            <div className="w-100 d-flex flex-column text-start ps-4">
              <h4 className="d-flex justify-content-between border-bottom">
                <span>{food.name}</span>
                <button className="text-primary btn btn-dark ms-4">
                  Order
                </button>
              </h4>
              <div className="d-flex justify-content-between">
                <span>
                  <h5 className="text-primary">Point: {food.points}</h5>
                </span>
                <span>
                  <h5>Price: {food.price.toFixed(2)}</h5>
                </span>
              </div>
              {isAdmin && (
                <div className="food-item-admin">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="food-item" onClick={() => !isAdmin && onClick()}>
    //   <img src={food.image} alt={food.name} className="food-item-image" />
    //   <h4>{food.name}</h4>
    //   <p>Price: {food.price.toFixed(2)}</p>
    //   <p>Point: {food.points}</p>
    //   {isAdmin && (
    //     <div className="food-item-admin">
    //       <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           onUpdate();
    //         }}
    //       >
    //         Edit
    //       </button>
    //       <button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           onDelete();
    //         }}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   )}
    // </div>
  );
};

export default FoodItem;
