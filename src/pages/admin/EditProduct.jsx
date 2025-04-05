// src/pages/admin/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { fetchProductById, updateProduct } from '../../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    imageFile: null
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await fetchProductById(id);
        setFormData({
          title: product.title,
          price: product.price.toString(),
          description: product.description,
          category: product.category,
          image: product.images[0] || '',
          imageFile: null
        });
        setImagePreview(product.images[0] || '');
      } catch (error) {
        console.error('Error fetching product:', error);
        showToast('Failed to fetch product details', 'error');
        navigate('/admin/products');
      }
    };

    fetchProduct();
  }, [id, navigate, showToast]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Update product with the image URL
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        images: [imageUrl]
      };

      await updateProduct(id, productData);
      showToast('Product updated successfully!', 'success');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      showToast(error.message || 'Failed to update product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={handleUrlChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL"
          />
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

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;