import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDescription.css';

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then((response) => {
      setProduct(response.data);
    }).catch(error => {
      console.error("Error fetching product:", error);
    });
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-description">
      <img src={product.url} alt={product.pname} />
      <h1>{product.pname}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <div>
        <label>Sizes: </label>
        {product.sizes.map(size => (
          <button key={size} className="size-button">{size}</button>
        ))}
      </div>
      <div>
        <label>Colors: </label>
        {product.colors.map(color => (
          <button key={color} className="color-button" style={{ backgroundColor: color }}></button>
        ))}
      </div>
      <div className="quantity-control">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductDescription;
