import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReviewOrder.css'; // Import CSS for styling
import { CartContext } from '../../cart/CartContext';

const ReviewOrders = () => {
  const {  calculateGrossAmount,cart,setCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5128/api/Cart/${localStorage.getItem('email')}`)
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const calculateGrossPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
  };

  
  const handleProceedToShipping = () => {
    navigate('/Shipping');
  };
  const handleProceedToCheckout = () => {
    axios.post('http://localhost:5128/api/order',{
      email:localStorage.getItem('email'),
      grossAmount:calculateGrossAmount
  }).then(()=>{
    alert('Order Placed successfully')
    setCart([])
  })
  };
  return (
    <div className="review-orders">
      <h2>Review Orders</h2>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li key={item.productId} className="cart-item">
            <img src={item.image} alt={item.name} className="product-image" onError={(e) => e.target.style.display = 'none'} />
            <div className="product-details">
              <h3>{item.name}</h3>
              <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="gross-price">
        <h3>Gross Price: ${calculateGrossPrice()}</h3>
      </div>
     
      <button onClick={handleProceedToCheckout} className="proceed-button">Proceed to Checkout</button>
    </div>
  );
};
export default ReviewOrders;
