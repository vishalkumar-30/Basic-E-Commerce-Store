import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const ListItems = ({ addToCart }) => {
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  console.log(decode.userId);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/items");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        console.log(data.items);
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      addToCart(item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        List Items
      </h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <p
              style={{
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </p>
            <p
              style={{ marginBottom: "10px", fontSize: "16px", color: "#666" }}
            >
              ${item.price}
            </p>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
