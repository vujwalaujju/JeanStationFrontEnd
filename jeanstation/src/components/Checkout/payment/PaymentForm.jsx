import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../cart/CartContext';

const PaymentForm = () => {
    const { cart, handleQuantityChange, handleRemove, calculateTotalCost, calculateGrossAmount } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        payPalEmail: '',
        bankName: '',
        accountNumber: '',
        ifscCode: ''
    });

    // Retrieve cart data from localStorage
    const getCartData = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

  
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('order')
    axios.post('http://localhost:5128/api/order',{
        email:localStorage.getItem('email'),
        grossAmount:calculateGrossAmount

    })
     //   const cartData = getCartData(); // Get cart data from localStorage
    
        // try {
        //     // Reduce the quantity of products
        //     await Promise.all(cartData.map(async (item) => {
        //         try {
        //             // Get the stock data for the product
        //             const stockResponse = await axios.get('http://localhost:5128/api/StockProduct');
        //             const stockData = stockResponse.data.find(stock =>
        //                 stock.productId === item.productId &&
        //                 stock.colour === item.color 
        //             );
    
        //             if (stockData) {
        //                 // Update the quantity based on size
        //                 let updatedQuantity;
        //                 switch (item.size) { 
        //                     case 'S':
        //                         updatedQuantity = stockData.s - item.quantity;
        //                         if (updatedQuantity < 0) throw new Error(`Insufficient stock for size ${item.size}`);
        //                         await axios.put(`http://localhost:5128/api/StockProduct/ByProductId/${stockData.productId}`, { s: updatedQuantity });
        //                         break;
        //                     case 'M':
        //                         updatedQuantity = stockData.m - item.quantity;
        //                         if (updatedQuantity < 0) throw new Error(`Insufficient stock for size ${item.size}`);
        //                         await axios.put(`http://localhost:5128/api/StockProduct/ByProductId/${stockData.productId}`, { m: updatedQuantity });
        //                         break;
        //                     case 'L':
        //                         updatedQuantity = stockData.l - item.quantity;
        //                         if (updatedQuantity < 0) throw new Error(`Insufficient stock for size ${item.size}`);
        //                         await axios.put(`http://localhost:5128/api/StockProduct/ByProductId/${stockData.productId}`, { l: updatedQuantity });
        //                         break;
        //                     case 'Xl':
        //                         updatedQuantity = stockData.xl - item.quantity;
        //                         if (updatedQuantity < 0) throw new Error(`Insufficient stock for size ${item.size}`);
        //                         await axios.put(`http://localhost:5128/api/StockProduct/ByProductId/${stockData.productId}`, { xl: updatedQuantity });
        //                         break;
        //                     default:
        //                         throw new Error(`Invalid size ${item.size}`);
        //                 }
        //             } else {
        //                 console.warn(`No stock data found for product ${item.productId} and color ${item.color}`);
        //             }
        //         } catch (error) {
        //             console.error(`Error updating stock for product ${item.productId}:`, error);
        //             throw error; // Rethrow the error to stop the process
        //         }
        //     }));
    
        //     // Clear the cart in localStorage
        //     localStorage.removeItem('cart');
        //     alert('Payment successful and order placed!');
        // } catch (error) {
        //     console.error('Error processing payment and creating order:', error);
        //     alert('An error occurred. Please try again.');
        // }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Payment Method</label>
                <select
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Net Banking">Net Banking</option>
                </select>
            </div>

            {paymentMethod === 'Credit Card' && (
                <>
                    <div>
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Card Name</label>
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </>
            )}

            {paymentMethod === 'PayPal' && (
                <div>
                    <label>PayPal Email</label>
                    <input
                        type="email"
                        name="payPalEmail"
                        value={formData.payPalEmail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            )}

            {paymentMethod === 'Net Banking' && (
                <>
                    <div>
                        <label>Bank Name</label>
                        <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Account Number</label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>IFSC Code</label>
                        <input
                            type="text"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default PaymentForm;