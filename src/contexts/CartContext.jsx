// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate total price
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Product doesn't exist, add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update quantity of product in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Process checkout
  const checkout = (checkoutData) => {
    // Display success message as per requirements
    alert(`Transaction success by ${checkoutData.fullName} with total price ${cartTotal}.`);
    
    // Clear cart and redirect to about page
    clearCart();
    navigate('/about');
  };

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};