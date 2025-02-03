// SettingsPage.js
"use client";

import React, { useState } from "react";
import { useCategories } from "../../context/CategoryContext"; // Import the context

const SettingsPage = () => {
  const { addCategory } = useCategories(); // Get the addCategory function from context

  const [newCategory, setNewCategory] = useState({
    imgSrc: "",
    path: "",
    title: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddCategory = () => {
    if (newCategory.title && newCategory.imgSrc && newCategory.path) {
      addCategory(newCategory); // Add the new category using context
      setNewCategory({ imgSrc: "", path: "", title: "" }); // Clear the form
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "250px",
          background: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2 style={{ marginBottom: "16px", color: "black" }}>Sections</h2>
        {/* Sidebar content */}
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ color: "black" }}>Add New Category</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newCategory.title}
          onChange={handleInputChange}
          style={{
            display: "block",
            margin: "8px 0",
            padding: "8px",
            width: "100%",
          }}
        />
        <input
          type="text"
          name="imgSrc"
          placeholder="Image URL"
          value={newCategory.imgSrc}
          onChange={handleInputChange}
          style={{
            display: "block",
            margin: "8px 0",
            padding: "8px",
            width: "100%",
          }}
        />
        <input
          type="text"
          name="path"
          placeholder="Path"
          value={newCategory.path}
          onChange={handleInputChange}
          style={{
            display: "block",
            margin: "8px 0",
            padding: "8px",
            width: "100%",
          }}
        />
        <button
          onClick={handleAddCategory}
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Category
        </button>
      </main>
    </div>
  );
};

export default SettingsPage;
