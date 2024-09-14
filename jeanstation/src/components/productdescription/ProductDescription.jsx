import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import './ProductDescription.css';

const ProductDescription = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5128/api/StockProduct/ByProductId/${productId}`)
      .then(response => {
        console.log("Fetched product details:", response.data);
        setProductDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedSize(null); // Reset size selection when color changes
    setQuantity(1); // Reset quantity when color changes
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when size changes
  };

  const handleAddToCart = () => {
    // Implement the logic to add the product to the cart
    console.log("Product added to cart");
  };

  const handleQuantityChange = (amount) => {
    const selectedProduct = productDetails.find(detail => detail.colour === selectedColor && detail.size === selectedSize);
    if (selectedProduct) {
      setQuantity(prevQuantity => Math.max(1, Math.min(prevQuantity + amount, selectedProduct.quantity)));
    }
  };

  const colors = [...new Set(productDetails.map(detail => detail.colour))];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="container">
      <h1 className="my-4">Product Description</h1>
      <div className="row">
        <div className="col-md-6">
          <img 
            src={location.state.image} 
            alt="Product" 
            style={{ 
              maxHeight: '300px', 
              width: '100%', 
              objectFit: 'contain' 
            }} 
          />
        </div>
        <div className="col-md-6">
          <h2>Product Details</h2>
          <div>
            <h3>Colors</h3>
            {colors.map(color => (
              <button 
                key={color} 
                className={`btn ${color === selectedColor ? 'btn-primary' : 'btn-secondary'} m-2`} 
                onClick={() => handleColorClick(color)}
              >
                {color}
              </button>
            ))}
          </div>
          {selectedColor && (
            <div>
              <h3>Sizes for {selectedColor}</h3>
              <div className="size-buttons">
                {sizes.map(size => (
                  <button 
                    key={size} 
                    className={`btn ${size === selectedSize ? 'btn-primary' : 'btn-secondary'} m-2`} 
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          {selectedSize && (
            <div>
              <h3>Quantity for {selectedSize}</h3>
              <div className="quantity-control">
                <button className="btn btn-secondary" onClick={() => handleQuantityChange(-1)}>-</button>
                <span className="mx-2">{quantity}</span>
                <button className="btn btn-secondary" onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>
          )}
          <button className="btn btn-primary mt-4" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
