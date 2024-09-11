import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminHome.css';

const AdminHome = () => {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({
    Location: '',
    Image: ''
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = () => {
    axios.get('http://localhost:5128/api/Store')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore({ ...newStore, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5128/api/Store', newStore)
      .then(() => {
        fetchStores(); // Refresh the list of stores
        setNewStore({ Location: '', Image: '' }); // Reset the form
      })
      .catch(error => {
        console.error('Error adding store:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Admin Home</h1>
      <h2>Stores</h2>
      <div className="row">
        {stores.map(store => (
          <div className="col-md-4" key={store.id}>
            <div className="card mb-4">
              <img src={store.image} className="card-img-top" alt={store.name} />
              <div className="card-body">
                
                <p className="card-text">{store.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2>Add New Store</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="Location"
            className="form-control"
            value={newStore.Location}
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
            value={newStore.Image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Store</button>
      </form>
    </div>
  );
};
export default AdminHome;

