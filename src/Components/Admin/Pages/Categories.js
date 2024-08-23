import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import "./category.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newName, SetNewName] = useState("");
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/category"
        );
        if (Array.isArray(responseData)) {
          setCategories(responseData);
        } else {
          setCategories([]);
          console.error("Expected array but got:", responseData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [sendRequest]);

  const handleUpdateCategories = async (categoryId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/category/${categoryId}`,
        "PATCH",
        JSON.stringify({ name: newName }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === categoryId ? { ...cat, name: newName } : cat
        )
      );
      setEditingCategory(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/category/${categoryId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="category-container">
      <h1 className="categories-title">Manage Categories</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && categories.length > 0 && (
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category._id} className="categories-item">
              {editingCategory === category._id ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => SetNewName(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdateCategories(category._id)}
                    className="categories-button-update"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="categories-button-delete"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="category-name">{category.name}</span>
                  <button
                    onClick={() => setEditingCategory(category._id)}
                    className="categories-button-update"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="categories-button-delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
