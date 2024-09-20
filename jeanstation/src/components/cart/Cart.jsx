import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const { cart, setCart, handleQuantityChange, handleRemove, calculateTotalCost, calculateGrossAmount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(JSON.stringify(cart));
    navigate('/review-order');
    console.log("Proceeding to buy now");
  };

  useEffect(() => {
    // Fetch cart data from the backend server when the component mounts
    axios.get(`http://localhost:5128/api/Cart/${localStorage.getItem('email')}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart data:", error);
      });
  }, [setCart]);

  return (
    <div className="container">
      <h1 className="my-4">Cart</h1>
      {localStorage.getItem("email") != null ? (
        cart.length > 0 ? (
          <>
            {cart.map((product, index) => (
              <div key={index} className="card mb-4">
                {console.log(product)}
                <div className="card-horizontal">
                  <img 
                    src={product.image} 
                    alt={product.description} 
                    className="product-image" // Apply CSS class
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Price: {product.price}</p>
                    <p className="card-text">Color: {product.color}</p>
                    <p className="card-text">Size: {product.size}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                    <p className="card-text">Total Cost: {calculateTotalCost(product)}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>+</button>
                    </div>
                    <button className="btn btn-danger mt-2" onClick={() => handleRemove(product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="gross-amount">
              <h3>Gross Amount: {calculateGrossAmount()}</h3>
            </div>
            <button className="btn btn-primary mt-4" onClick={handleBuyNow}>Buy Now</button>
          </>
        ) : (
          <p>No items in the cart.</p>
        )
      ) : (
        <div>
          <p>Please Sign in to add items to the cart.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
