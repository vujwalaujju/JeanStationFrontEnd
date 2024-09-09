import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stores from './Components/stores/Stores';
import StoreProducts from './Components/storeproducts/StoreProducts';
import ProductDescription from './Components/productdescription/ProductDescription';
import NavBar from './Components/Navbar/NavBar';
import './App.css';
import AdminHome from './Components/admin/AdminHome';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Stores />} />
          <Route path="/products/:id" element={<StoreProducts />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/Admin" element={<AdminHome/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
