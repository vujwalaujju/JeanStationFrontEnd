import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './ProductDescription.css';
import { CartContext } from '../cart/CartContext';
const ProductDescription = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext);

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
    setSelectedSize(null); // reseting  size selection when color changes
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      const product = {
        productId, 
        name: location.state.name,
        image: location.state.image,
        price: location.state.price,
        color: selectedColor,
        size: selectedSize,
        quantity: 1, // Default quantity
      };
      addToCart(product); // Using  the CartContext to add the product
      navigate('/cart');
      console.log("Product added to cart");
    } else {
      alert("Please select both color and size");
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
            style={{ maxHeight: '300px', width: '100%', objectFit: 'contain' }} 
          />
        </div>
        <div className="col-md-6">
          <p><strong>{location.state.name}</strong></p>
          <p><strong>Description:</strong> {location.state.description}</p>
          <p><strong>Price:</strong> {location.state.price}</p>

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

          <button className="btn btn-primary mt-4" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;