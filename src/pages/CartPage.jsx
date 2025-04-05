// src/pages/CartPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex items-center py-5 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.images[0] || 'https://placehold.co/600x400'}
          alt={item.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.title}</h3>
            <p className="ml-4">${item.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <p className="text-gray-500 mr-3">Qty</p>
            <div className="flex border border-gray-300 rounded">
              <button
                type="button"
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 0) {
                    updateQuantity(item.id, value);
                  }
                }}
                className="w-12 px-2 py-1 text-center border-x border-gray-300"
              />
              <button
                type="button"
                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    navigate('/checkout');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Time to start shopping!</p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6 flex justify-between">
                  <Link
                    to="/products"
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 lg:col-span-4">
              <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Shipping estimate</p>
                    <p className="text-sm font-medium text-gray-900">$5.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Tax estimate</p>
                    <p className="text-sm font-medium text-gray-900">${(cartTotal * 0.1).toFixed(2)}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <p className="text-base font-medium text-gray-900">Order total</p>
                    <p className="text-base font-medium text-gray-900">
                      ${(cartTotal + 5 + cartTotal * 0.1).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;