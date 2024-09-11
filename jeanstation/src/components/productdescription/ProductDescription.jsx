import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDescription.css';

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then((response) => {
      setProduct(response.data);
    }).catch(error => {
      console.error("Error fetching product:", error);
    });
  }, [id]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setAvailableColors(Object.keys(product.Scolor[size]));
    setSelectedColor(null);
    setQuantity(1);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setQuantity(product.Scolor[selectedSize][color]);
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(0, quantity + amount);
    setQuantity(newQuantity);

    if (newQuantity >= 0) {
      const updatedProduct = {
        ...product,
        Scolor: {
          ...product.Scolor,
          [selectedSize]: {
            ...product.Scolor[selectedSize],
            [selectedColor]: product.Scolor[selectedSize][selectedColor] - amount
          }
        }
      };

      axios.post(`http://localhost:3000/products/${id}`, updatedProduct)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error("Error updating quantity:", error);
        });
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-description">
      <img src={product.url} alt={product.pname} />
      <div className="product-details">
        <h1>{product.pname}</h1>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price}</p>
        <div className="sizes">
          <label>Sizes: </label>
          {product.sizes.map(size => (
            <button 
              key={size} 
              className={`size-button ${selectedSize === size ? 'selected' : ''}`} 
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
        {selectedSize && (
          <div className="colors">
            <label>Colors: </label>
            {availableColors.map(color => (
              <button 
                key={color} 
                className={`color-button ${selectedColor === color ? 'selected' : ''}`} 
                style={{ backgroundColor: color }} 
                onClick={() => handleColorClick(color)}
              >
                {color}
              </button>
            ))}
          </div>
        )}
        {selectedColor && (
          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 0}>-</button>
            <span>{quantity > 0 ? quantity : 'Out of Stock'}</span>
            <button onClick={() => handleQuantityChange(1)} disabled={quantity <= 0}>+</button>
          </div>
        )}
        <button className="add-to-cart" disabled={quantity <= 0}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDescription;
