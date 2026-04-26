import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  // Not logged in

  if (!token) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );

  }

  // Logged in

  return children;

}

export default ProtectedRoute;