// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Pages
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

// Protected routes wrapper
const ProtectedRoute = ({ element, allowedRole }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole === 'admin' && currentUser.role !== 'admin') {
    return <Navigate to="/products" replace />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-grow">
                <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProductsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                
                {/* Protected Member Routes */}
                <Route 
                  path="/cart" 
                  element={<ProtectedRoute element={<CartPage />} allowedRole="member" />} 
                />
                <Route 
                  path="/checkout" 
                  element={<ProtectedRoute element={<CheckoutPage />} allowedRole="member" />} 
                />

                {/* Protected Admin Routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={<ProtectedRoute element={<Dashboard />} allowedRole="admin" />} 
                />
                <Route 
                  path="/admin/products" 
                  element={<ProtectedRoute element={<ProductList />} allowedRole="admin" />} 
                />
                <Route 
                  path="/admin/products/add" 
                  element={<ProtectedRoute element={<AddProduct />} allowedRole="admin" />} 
                />
                <Route 
                  path="/admin/products/edit/:id" 
                  element={<ProtectedRoute element={<EditProduct />} allowedRole="admin" />} 
                />
                </Routes>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;