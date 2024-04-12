import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import Login from "./components/Login";
import ListItems from "./components/ListItems";
import Cart from "./components/Cart";
import SignUp from "./components/SignUp";
import Orders from "./components/Orders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const handleLoginFunc = () => {
    setIsLoggedIn(true);
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };
  const handleLogout = () => {
    // Clear local storage token
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000";
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    alert("Item has been added to the cart!");
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const placeOrder = () => {
    // Convert cart to order
    setOrders([...orders, cartItems]);
    setCartItems([]);
    // Show toast for successful order
    alert("Order successful");
    // Redirect to ListItems screen
    history.push("/");
  };

  const viewCart = () => {
    // Show all the cart items
    alert(`Cart Items: ${JSON.stringify(cartItems)}`);
  };

  const viewOrderHistory = () => {
    // Show all placed orders
    alert(`Order History: ${JSON.stringify(orders)}`);
  };

  return (
    <Router>
      <div className="App">
        <nav style={{ backgroundColor: "#333", padding: "20px 0" }}>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              textAlign: "center",
            }}
          >
            <li style={{ display: "inline-block", marginRight: "20px" }}>
              <Link
                to="/"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                }}
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("token") && (
              <>
                <li style={{ display: "inline-block", marginRight: "20px" }}>
                  <Link
                    to="/cart"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    Cart
                  </Link>
                </li>
                <li style={{ display: "inline-block", marginRight: "20px" }}>
                  <Link
                    to="/orders"
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    Orders
                  </Link>
                </li>
                <li style={{ display: "inline-block" }}>
                  <Link
                    to="/"
                    onClick={handleLogout}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {isLoggedIn && (
          <div>
            <button onClick={placeOrder} style={{ marginRight: "10px" }}>
              Checkout
            </button>
            <button onClick={viewCart} style={{ marginRight: "10px" }}>
              Cart
            </button>
            <button onClick={viewOrderHistory}>Order History</button>
          </div>
        )}

        <Switch>
          <Route path="/" exact>
            {localStorage.getItem("token") ? (
              <ListItems addToCart={addToCart} />
            ) : (
              <Login onLogin={handleLoginFunc} />
            )}
          </Route>
          <Route path="/cart">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              setCartItems={setCartItems}
            />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
        </Switch>
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </div>
    </Router>
  );
}

export default App;
