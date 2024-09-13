import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../Shared/hooks/http-hooks";
import { AuthContext } from "../../Shared/Components/Context/Auth-context";
import "./category.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/category"
        );
        setCategories(Array.isArray(responseData) ? responseData : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
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
      console.error("Failed to update category:", error);
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
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="category-container">
      <h1 className="categories-title">Manage Categories</h1>
      {isLoading && <p className="loading-message">Loading categories...</p>}
      {!isLoading && categories.length > 0 ? (
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category._id} className="category-card">
              {editingCategory === category._id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="category-input"
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => handleUpdateCategories(category._id)}
                      className="action-btn save-btn"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="action-btn cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="category-content">
                  <span className="category-name">{category.name}</span>
                  <div className="category-actions">
                    <button
                      onClick={() => {
                        setEditingCategory(category._id);
                        setNewName(category.name);
                      }}
                      className="action-btn edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p className="no-categories">No categories found</p>
      )}
    </div>
  );
};

export default Categories;
