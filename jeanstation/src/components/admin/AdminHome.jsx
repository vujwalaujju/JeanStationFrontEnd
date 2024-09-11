import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleShowStoresClick = () => {
    navigate('/admin/showstore');
  };

  const handleAddStoreClick = () => {
    navigate('/admin/addstore');
  };

  return (
    <div className="container mt-5">
      <h1>Admin Home</h1>
      <button className="btn btn-primary" onClick={handleShowStoresClick}>Show Stores</button>
      <button className="btn btn-secondary" onClick={handleAddStoreClick}>Add Store</button>
    </div>
  );
};

export default AdminHome;

