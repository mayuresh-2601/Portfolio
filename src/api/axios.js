import axios from "axios";

/*
========================================
BASE URL
========================================
*/

const baseURL =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api";

/*
========================================
AXIOS INSTANCE
========================================
*/

const api = axios.create({
  baseURL,
  withCredentials: true
});

/*
========================================
REQUEST INTERCEPTOR
========================================
*/

api.interceptors.request.use(
  (config) => {

    /*
    ----------------------------------------
    ADD JWT TOKEN
    ----------------------------------------
    */

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    /*
    ----------------------------------------
    CONTENT TYPE
    ----------------------------------------
    */

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

/*
========================================
RESPONSE INTERCEPTOR
========================================
*/

api.interceptors.response.use(

  (response) => response,

  (error) => {

    /*
    Handle token expiration
    */

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/admin";

    }

    return Promise.reject(error);

  }
);

export default api;