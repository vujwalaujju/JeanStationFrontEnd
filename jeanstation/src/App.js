import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stores from './Components/stores/Stores';
import StoreProducts from './Components/storeproducts/StoreProducts';
import ProductDescription from './Components/productdescription/ProductDescription';
import NavBar from './Components/Navbar/NavBar';
import './App.css';
import Adminlayout from './Adminlayout';
import SignUp from './Components/signup/SignUp';
import SignIn from './Components/signin/SignIn';
import LogOut from './Components/logout/LogOut';
import ReviewOrder from './Components/Checkout/revieworder/ReviewOrder';
import ShippingForm from './Components/Checkout/shipping/ShippingForm';
import PaymentForm from './Components/Checkout/payment/PaymentForm';
import Cart from './Components/cart/Cart';
import CartProvider from './Components/cart/CartContext';
function App() {
  return (
    <div className="App">
      <CartProvider>
      <Router>
      
        <NavBar />
        <Routes>
          <Route path="/" element={<Stores />} />
          <Route path="/storeproducts/:storeId" element={<StoreProducts />} />
         
          <Route path="/productdescription/:productId" element={<ProductDescription />} />
          
<Route path="/signup" element={<SignUp/>}/>
<Route path="/signin" element={<SignIn/>}/>
<Route path="/logout" element={<LogOut/>}/>
<Route path="/cart" element={<Cart/>}/>
            <Route path="/review-order" element={<ReviewOrder/>}/>
            <Route path="/shipping" element={<ShippingForm/>} />
            <Route path="/payment" element={<PaymentForm/>}/>
        
          </Routes>
          
        <Adminlayout/>
      </Router>
      </CartProvider>
    </div>
  );
}
export default App;
