// api.js

import axios from 'axios';
// Create an Axios instance
const api = axios.create({
  baseURL: 'http:localhost:3010',  // replace with your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Replace 'token' with your token key
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can also add a response interceptor if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error (e.g., token expiry, unauthorized access)
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to login or refresh token logic
    }
    return Promise.reject(error);
  }
);

export default api;
