// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage = () => {
  const { cartItems, cartTotal, checkout } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: currentUser?.name || '',
    fullName: '',
    phone: '',
    email: currentUser?.email || '',
    address: '',
    accountNumber: ''
  });
  
  const [errors, setErrors] = useState({});

  // Redirect to products if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/products');
    }
  }, [cartItems, navigate]);

  // Update form data when user data changes
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        username: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{10,20}$/.test(formData.accountNumber.replace(/\D/g, ''))) {
      newErrors.accountNumber = 'Please enter a valid account number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      checkout(formData);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Please fill in your details to complete your order</p>
        </div>

        <div className="mt-10 sm:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      disabled
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-100"
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Home Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {errors.accountNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                    )}
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.images[0] || "https://placehold.co/600x400"}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="truncate max-w-xs">{item.title}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <p>Shipping</p>
                  <p>$5.00</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <p>Tax</p>
                  <p>${(cartTotal * 0.1).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                  <p>Total</p>
                  <p>${(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Shipping and taxes are calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;