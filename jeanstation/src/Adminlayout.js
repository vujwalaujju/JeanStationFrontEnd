import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminHome from './Components/admin/AdminHome';
import AddProduct from './Components/admin/addproduct/AddProduct';
import AddStore from './Components/admin/addstore/AddStore';
import ShowStore from './Components/admin/showstore/ShowStore';
import ShowProduct from './Components/admin/showproduct/ShowProduct';
// Import other admin components as needed

const Adminlayout = () => {
  return (
    <div className='Admin'>
        <Routes>
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/admin/addstore" element={<AddStore/>}/>
        <Route path="/admin/showstore" element={<ShowStore/>}/>
        <Route path="/admin/addproduct/:storeId" element={<AddProduct/>}/>
        <Route path="/admin/showproduct/:storeId" element={<ShowProduct/>}/>
        </Routes>
        
    </div>
  );
};
export default Adminlayout;
