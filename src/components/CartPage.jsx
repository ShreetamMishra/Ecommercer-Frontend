import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [totalCost, setTotalCost] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`https://ecommerce-backend-7jr9.onrender.com/cart/?token=${token}`);
        const { cartItems, totalCost } = response.data;
        setCartItems(cartItems);
        setTotalCost(totalCost);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };

    fetchCartItems();
  }, [token]);

  const handleRemoveItems = async () => {
    try {
      // Remove each item from the cart
      for (const item of cartItems) {
        await axios.delete(`https://ecommerce-backend-7jr9.onrender.com/cart/delete/${item.id}?token=${token}`);
      }
      // After removing all items, clear the cart and redirect to home
      setCartItems([]);
      setTotalCost(0);
      navigate('/');
    } catch (err) {
      console.error('Error removing items:', err);
    }
  };

  const handlePayment = () => {
    // Show the popup, but don't remove items yet
    setShowPopup(true);
  };

  const handleClosePopup = async () => {
    // After confirming payment, remove items from the cart
    await handleRemoveItems();
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 mt-10 mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="text-left text-xs md:text-sm">
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Total</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm">
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-4 flex items-center space-x-2 sm:space-x-4">
                      <img
                        src={item.product.imageURL}
                        alt={item.product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                      />
                      <span className="truncate">{item.product.name}</span>
                    </td>
                    <td className="py-2 px-4">₹{item.product.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">₹{(item.product.price * item.quantity).toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <button
                        className="btn bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm hover:bg-red-600 transition"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold">Total: ₹{totalCost.toFixed(2)}</h2>
              <button
                className="btn bg-green-500 text-white px-4 py-2 rounded-md text-sm sm:text-base hover:bg-green-600 transition mt-4 sm:mt-0"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 md:p-6 rounded-md shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold">Payment Confirmation</h3>
              <p className="mt-2">{`Your payment of ₹${totalCost.toFixed(2)} is done.`}</p>
              <button
                className="btn bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition"
                onClick={handleClosePopup}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
