import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              E-Commerce
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-800">
              Products
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-800">
              Cart ({cartItems.length})
            </Link>
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-800">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 