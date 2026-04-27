import axios from "axios";

// Create axios instance

const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000",

  headers: {
    "Content-Type": "application/json",
  },

});

// Automatically attach JWT token

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

// Handle global errors

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.warn(
        "Unauthorized - token expired"
      );

      localStorage.removeItem("token");

      window.location.href = "/admin";

    }

    return Promise.reject(error);

  }

);

export default api;