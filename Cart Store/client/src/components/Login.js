import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from causing a page reload

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location.href = "http://localhost:3000/";
      console.log("Login successful", data);
      // Handle successful login here (e.g., redirect, store token, etc.)
    } catch (error) {
      console.error(error);
      window.alert("Invalid username/password");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "400px",
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
        Login
      </h2>
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#f9fafc",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
