import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
});

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    // IMPORTANT FIX
    // Let browser set multipart/form-data automatically

    if (
      !(config.data instanceof FormData)
    ) {
      config.headers["Content-Type"] =
        "application/json";
    }

    return config;

  },

  (error) =>
    Promise.reject(error)
);

export default api;