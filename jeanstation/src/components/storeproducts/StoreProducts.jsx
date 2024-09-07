import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './StoreProducts.css';

const StoreProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/products?storeId=${id}`).then((response) => {
      const storeProducts = response.data.filter((prod) => prod.Storeid == id);
      setProducts(storeProducts);
      setFilteredProducts(storeProducts);
    }).catch(error => {
      console.error("Error fetching products:", error);
    });
  }, [id]);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((prod) => prod.pname.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (genderFilter) {
      filtered = filtered.filter((prod) => prod.gender === genderFilter);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, genderFilter, products]);

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender);
  };

  return (
    <div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search here..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleGenderFilter("women")}>Women</button>
        <button onClick={() => handleGenderFilter("men")}>Men</button>
      </div>
      <div className='productcontainer'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className='card product-item'>
              <img src={product.url} className='card-img-top' alt={product.pname} />
              <div className='card-body'>
                <h5 className='card-title'>{product.pname}</h5>
                <p className='card-text'>Price: {product.price}</p>
                <button className='btn btn-primary' onClick={() => navigate(`/product/${product.id}`)}>View</button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available for this store.</div>
        )}
      </div>
    </div>
  );
};

export default StoreProducts;
