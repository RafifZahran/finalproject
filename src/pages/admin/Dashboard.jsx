// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../../services/api';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch products data
        const productsData = await fetchProducts(0, 5); // Limit to 5 recent products
        setRecentProducts(productsData);
        
        // Get total product count (in a real app, you'd have an API endpoint for this)
        // For now, we'll just use the length of fetched products
        setProductCount(productsData.length);

        // Fetch categories data
        const categoriesData = await fetchCategories();
        setCategoryCount(categoriesData.length);

        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Product Stats */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Products
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {productCount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to="/admin/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                      View all products
                    </Link>
                  </div>
                </div>
              </div>

              {/* Category Stats */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Categories
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {categoryCount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">
                      Category management
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Quick Actions
                  </h3>
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <Link
                      to="/admin/products/add"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add New Product
                    </Link>
                    <Link
                      to="/admin/products"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Manage Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Products */}
            <div className="mt-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Products</h2>
              <div className="mt-4 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentProducts.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                No products found
                              </td>
                            </tr>
                          ) : (
                            recentProducts.map((product) => (
                              <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img 
                                        className="h-10 w-10 rounded-full object-cover" 
                                        src={product.images[0] || "https://placehold.co/600x400"} 
                                        alt={product.title} 
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {product.title}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        ID: {product.id}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">${product.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {product.category?.name || 'Uncategorized'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link to={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                    Edit
                                  </Link>
                                  <Link to={`/products/${product.id}`} target="_blank" className="text-gray-600 hover:text-gray-900">
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;