import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
console.log('Role:'+role)
    if (role === 'User') {
      // Fetch order data for User
      axios.get(`http://localhost:5128/api/orderitems/email/${email}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error("Error fetching order data:", error);
        });
    } else  {
      // Fetch order data for Admin
      axios.get('http://localhost:5128/api/orderitems')
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error("Error fetching order data:", error);
        });
    }
  }, []);

  return (
    <div className="container mt-4">
      <h1>Your Orders</h1>
      <div className="row">
        {orders.length > 0 ? (
          orders.map(order => (
            <div className="col-md-4" key={order.id}>
              <div className="card mb-4">
                <img src={order.image} className="card-img-top" alt={order.itemName} />
                <div className="card-body">
                  <h5 className="card-title">{order.itemName}</h5>
                  <p className="card-text">Colour: {order.colour}</p>
                  <p className="card-text">Size: {order.size}</p>
                  <p className="card-text">Quantity: {order.quantity}</p>
                  <p className="card-text">Price: ${order.price}</p>
                  <button className="btn btn-warning mt-2">Out for Delivery</button>
                  <button className="btn btn-success mt-2 ml-2">Delivered</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Order;
