// This is a mock API service - in a real app, you would make actual API calls here
const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is product 1',
    price: 100,
    image: 'https://via.placeholder.com/150',
    category: 'Category 1',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is product 2',
    price: 200,
    image: 'https://via.placeholder.com/150',
    category: 'Category 2',
  },
];

let products = [...mockProducts];

const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    'Authorization': `Bearer ${user.accessToken}`,
    'Content-Type': 'application/json',
  };
};

// Products
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return handleResponse(response);
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse(response);
};

export const fetchRelatedProducts = async (category, limit = 4) => {
  const response = await fetch(`${BASE_URL}/products/?category=${category}&limit=${limit}`);
  return handleResponse(response);
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  return handleResponse(response);
};

export const createProduct = async (product) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  return handleResponse(response);
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Users
export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const getProfile = async () => {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Orders
export const createOrder = async (order) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(order),
  });
  return handleResponse(response);
};

export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const api = {
  // Products
  getProducts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return products;
  },

  getProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const product = products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return product;
  },

  createProduct: async (product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct = {
      ...product,
      id: products.length + 1,
    };
    products.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id, product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...product };
    return products[index];
  },

  deleteProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');
    products = products.filter(p => p.id !== parseInt(id));
    return true;
  },

  // Orders
  createOrder: async (order) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  },

  getOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
}; 