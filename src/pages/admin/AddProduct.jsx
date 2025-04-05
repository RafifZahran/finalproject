// src/pages/admin/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, fetchCategories } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: ['https://placehold.co/600x400'],
    image: '',
    imageFile: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageInputs, setImageInputs] = useState(['']);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: data[0].id }));
        }
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      // Only allow numbers and decimal points
      const formattedValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        image: '' // Clear URL if file is selected
      }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url,
      imageFile: null // Clear file if URL is entered
    }));
    setImagePreview(url);
  };

  const addImageInput = () => {
    setImageInputs([...imageInputs, '']);
  };

  const removeImageInput = (index) => {
    if (imageInputs.length > 1) {
      const newImageInputs = imageInputs.filter((_, i) => i !== index);
      setImageInputs(newImageInputs);

      const filteredImages = newImageInputs
        .filter(img => img.trim() !== '')
        .map(img => img.trim());
        
      setFormData(prev => ({ 
        ...prev, 
        images: filteredImages.length > 0 ? filteredImages : ['https://placehold.co/600x400'] 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title.trim()) {
      setError('Product title is required');
      return;
    }
    
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      setError('Please enter a valid price');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Product description is required');
      return;
    }
    
    if (!formData.categoryId) {
      setError('Please select a category');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.image;
      
      // If there's a file, upload it first
      if (formData.imageFile) {
        // Create FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('file', formData.imageFile);
        
        // Upload the file and get URL
        const uploadResponse = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
          method: 'POST',
          body: formDataToSend
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.location;
      }

      // Create product with the image URL
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        categoryId: parseInt(formData.categoryId),
        images: [imageUrl]
      };

      await createProduct(productData);
      showToast('Product added successfully!', 'success');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      showToast(error.message || 'Failed to add product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Add New Product
            </h2>
          </div>
        </div>

        <div className="mt-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Product Title *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Provide a detailed description of your product.
              </p>
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <div className="mt-1">
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {categories.length === 0 ? (
                    <option value="">Loading categories...</option>
                  ) : (
                    categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Add URLs for product images. At least one image is required.
              </p>
              <div className="space-y-4 mt-2">
                {imageInputs.map((url, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleUrlChange(e)}
                      placeholder="https://example.com/image.jpg"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    {imageInputs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageInput(index)}
                        className="ml-2 text-red-600 hover:text-red-900"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageInput}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Image
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Or Upload Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {imagePreview && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image Preview
                </label>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs h-auto rounded shadow-lg"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;