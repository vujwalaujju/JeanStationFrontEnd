import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './StoreProducts.css'; 

const StoreProducts = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5128/api/Product/${storeId}`)
      .then(response => {
        console.log("Fetched products:", response.data); 
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [storeId]);

  const StockProductHandler = (product) => {
    navigate(`/productdescription/${product.code}`, { state: { image: product.image } });
  };

  return (
    <div className="container">
      <h1 className="my-4">Products in Store {storeId}</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div 
              className="col-md-4" 
              key={product.code} 
              onClick={() => StockProductHandler(product)} 
              style={{ cursor: 'pointer' }}
            >
              <div className="card mb-4 custom-card">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ 
                    maxHeight: '150px', 
                    width: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this store.</p>
        )}
      </div>
    </div>
  );
};

export default StoreProducts;
