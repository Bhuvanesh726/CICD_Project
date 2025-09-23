import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
});

// This interceptor will now correctly find and attach the JWT token
api.interceptors.request.use(
  (config) => {
    // 1. Look for the 'user' object in localStorage
    const userString = localStorage.getItem('user');
    
    if (userString) {
      // 2. If it exists, parse the JSON to get the user object
      const userData = JSON.parse(userString);
      // 3. Get the token from the user object
      const token = userData.token;

      if (token) {
        // 4. If the token exists, add it to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;