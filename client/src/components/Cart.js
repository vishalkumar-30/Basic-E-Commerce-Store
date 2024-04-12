import React from "react";
import { jwtDecode } from "jwt-decode";
const Cart = ({ cartItems, removeFromCart,setCartItems }) => {
  const token=localStorage.getItem('token')
  const decode=jwtDecode(token)
  console.log(decode.userId)
  const handleAddToCart = async (item) => {
    try {
      const cartData = {
        userId: decode.userId,
        data:cartItems,
        name: decode.userId,
        status:"Order-placed",
      };
      const response = await fetch('http://localhost:8000/carts', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      setCartItems([])
      alert('Your order has been placed, check the status of orders in Orders Tab!');
    
      const responseData = await response.json();
      console.log("Item added to cart successfully", responseData);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Cart</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cartItems.map((item, index) => (
          <li key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
            <p style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{item.name}</p>
            <p style={{ marginBottom: '10px', fontSize: '16px', color: '#666' }}>${item.price}</p>
            <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={() => handleAddToCart()}>Place Order</button>
    </div>
  );
  
};

export default Cart;
