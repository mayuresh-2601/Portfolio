import axios from "axios";

/*
========================================
BASE URL FIXED (NO DOUBLE /api)
========================================
*/

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/*
========================================
AXIOS INSTANCE
========================================
*/

const api = axios.create({
  baseURL: `${API_URL}/api`, // ALWAYS SINGLE /api
  withCredentials: true
});

/*
========================================
REQUEST INTERCEPTOR
========================================
*/

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
========================================
RESPONSE INTERCEPTOR
========================================
*/

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin";
    }

    return Promise.reject(error);
  }
);

export default api;