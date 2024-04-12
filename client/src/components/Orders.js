import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/carts");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        console.log(data);
        setOrders(data.carts);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        All Orders
      </h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {orders.map((order) => (
          <li
            key={order.id}
            style={{
              marginBottom: "20px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9fafc",
            }}
          >
            <div style={{ padding: "20px" }}>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Order ID: {order.id}
              </p>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                Status: {order.status}
              </p>
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                Created At: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Items:
              </p>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {order.data.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#fff",
                    }}
                  >
                    <p
                      style={{
                        marginBottom: "5px",
                        fontSize: "16px",
                        color: "#333",
                      }}
                    >
                      Item Name: {item.name}
                    </p>
                    <p
                      style={{
                        marginBottom: "5px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      Item Status: {item.status}
                    </p>
                    <p
                      style={{
                        marginBottom: "5px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      Item Created At:{" "}
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
