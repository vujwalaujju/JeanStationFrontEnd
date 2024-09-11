import React from 'react';
import {Routes, Route } from 'react-router-dom';
import AdminHome from './Components/admin/AdminHome';
// Import other admin components as needed

const Adminlayout = () => {
  return (
    <div className='Admin'>
        <Routes>
        <Route path="/admin/Home" element={<AdminHome/>} />
        </Routes>
        
    </div>
  );
};
export default Adminlayout;
