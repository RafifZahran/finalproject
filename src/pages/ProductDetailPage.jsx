// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchRelatedProducts } from '../services/api';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
        
        // Reset states
        setQuantity(1);
        setActiveImage(0);
        setError(null);
        
        // Load related products
        const related = await fetchRelatedProducts(id);
        setRelatedProducts(related.slice(0, 4)); // Limit to 4 related products
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error || 'Product not found'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-700 font-medium truncate">{product.title}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="lg:max-w-lg lg:self-start">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.images[activeImage] || 'https://placehold.co/600x400'}
                alt={product.title}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* Image selector */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-indigo-500' : 'border border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
            
            <div className="mt-3 flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {product.category?.name || 'Uncategorized'}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-2xl font-extrabold text-gray-900">${product.price}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <div className="mt-4 prose prose-sm text-gray-500">
                <p>{product.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-gray-900 mr-4">Quantity</h2>
                <div className="flex border border-gray-300 rounded">
                  <button
                    type="button"
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 px-2 py-1 text-center border-x border-gray-300"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={relatedProduct.images[0] || 'https://placehold.co/600x400'}
                      alt={relatedProduct.title}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${relatedProduct.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {relatedProduct.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{relatedProduct.category?.name}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${relatedProduct.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;