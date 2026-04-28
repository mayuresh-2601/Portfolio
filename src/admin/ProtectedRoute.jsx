import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Get token from localStorage

  const token =
    localStorage.getItem("token");

  // If not logged in → redirect to login

  if (!token) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );

  }

  // If logged in → allow access

  return children;

}

export default ProtectedRoute;