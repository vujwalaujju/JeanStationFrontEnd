import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddProduct = () => {
  const { storeId } = useParams();
  const [newProduct, setNewProduct] = useState({
    Name: '',
    Price: '',
    Image: '',
    StoreId: storeId
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5128/api/Product', newProduct)
      .then(() => {
        setNewProduct({ Name: '', Price: '', Image: '', StoreId: storeId }); // Reset the form
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="Name"
            className="form-control"
            value={newProduct.Name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="text"
            name="Price"
            className="form-control"
            value={newProduct.Price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL:</label>
          <input
            type="text"
            name="Image"
            className="form-control"
            value={newProduct.Image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
