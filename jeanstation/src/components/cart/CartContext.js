import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart data from the backend server when the component mounts
    axios.get(`http://localhost:5128/api/Cart/${localStorage.getItem('email')}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    axios.post('http://localhost:5128/api/Cart', updatedCart)
      .catch(error => {
        console.error("Error updating cart data:", error);
      });
  };

  const addToCart = (product) => {

    const existingProductIndex = cart.findIndex(

      (item) => item.productId === product.productId && item.color === product.color && item.size === product.size

    );
    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) =>

        index === existingProductIndex

          ? { ...item, quantity: Math.min(item.quantity + product.quantity, 5), totalPrice: Math.min(item.quantity + product.quantity, 5) * item.price } // Ensure quantity does not exceed 5 and update total price

          : item

      );

    } else {

      // Product does not exist in the cart, add it

      updatedCart = [...cart, { ...product, quantity: Math.min(product.quantity, 5), totalPrice: Math.min(product.quantity, 5) * product.price }]; // Ensure initial quantity does not exceed 5 and set total price

    }

    // Make a POST request to store the cart data

    axios.post('http://localhost:5128/api/Cart', {

      productId: product.productId,

      color: product.color,

      size: product.size,

      quantity: Math.min(product.quantity, 5), // Ensure quantity does not exceed 5

      price: product.price,

      totalPrice: Math.min(product.quantity, 5) * product.price, // Ensure total price is calculated correctly

      image: product.image,
      email:localStorage.getItem('email')
      //description: product.description,

      //name: product.name

    }) // Ensure the correct data is sent

      .then(response => {

        console.log("Cart data stored successfully:", response.data);

        // Fetch the updated cart data

        return axios.get('http://localhost:5128/api/Cart');

      })

      .then(response => {

        setCart(response.data);

      })

      .catch(error => {

        console.error("Error storing cart data:", error);

      });

  };
 
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cart.map(item => 
      item.productId === productId
        ? { ...item, quantity: Math.min(quantity, 5), totalPrice: Math.min(quantity, 5) * item.price }
        : item
    );
    // updateCart(updatedCart);

    axios.put(`http://localhost:5128/api/Cart/UpdateQuantity/${productId}`, {
      quantity: Math.min(quantity, 5)
    })
    .then((resp)=>{
      setCart(resp.data)

    })
    .catch(error => {
      console.error("Error updating quantity:", error);
    });
  };

  const handleRemove = (productId) => {
    axios.delete(`http://localhost:5128/api/Cart/${productId}`)
      .then(response => {
        console.log("Item removed successfully:", response.data);
        return axios.get('http://localhost:5128/api/Cart');
      })
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error("Error removing item from cart:", error);
      });
  };

  const calculateTotalCost = (product) => {
    return product.totalPrice;
  };

  const calculateGrossAmount = () => {
    return cart.reduce((total, product) => total + calculateTotalCost(product), 0);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, handleQuantityChange, handleRemove, calculateTotalCost, calculateGrossAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
