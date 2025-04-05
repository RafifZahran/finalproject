// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(1);
    } else {
      alert('Please select a quantity greater than 0');
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75">
        <img
          src={product.images[0] || 'https://placehold.co/600x400'}
          alt={product.title}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mt-2 flex items-start justify-between">
          <div>
            <h3 className="text-sm text-gray-700 font-medium">
              {product.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {product.category?.name || 'Uncategorized'}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description || 'No description available'}
          </p>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex border border-gray-300 rounded">
            <button
              type="button"
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 px-2 py-1 text-center border-x border-gray-300"
            />
            <button
              type="button"
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="ml-auto flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const { addToCart } = useCart();
  const LIMIT = 12;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(page * LIMIT, LIMIT);
        
        if (data.length < LIMIT) {
          setHasMore(false);
        }
        
        // If it's the first page, replace products, otherwise append
        setProducts(prevProducts => (page === 0 ? data : [...prevProducts, ...data]));
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesName = product.title.toLowerCase().includes(filter.toLowerCase()) ||
                       (product.description && product.description.toLowerCase().includes(filter.toLowerCase()));
    const matchesCategory = categoryFilter ? product.category?.id === parseInt(categoryFilter) : true;
    return matchesName && matchesCategory;
  });

  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(0); // Reset to first page when changing filter
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(0); // Reset to first page when changing category
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our collection of high-quality products
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search products..."
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
            />
          </div>
          <div className="w-full sm:w-48">
            <label htmlFor="category" className="sr-only">
              Filter by Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {filteredProducts.length === 0 && !loading ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    addToCart={addToCart} 
                  />
                ))}
              </div>

              {loading && (
                <div className="flex justify-center mt-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
              )}

              {hasMore && !loading && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMoreProducts}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    Load More Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;