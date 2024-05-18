import { Navigate } from "react-router-dom";

function Logout() {
  localStorage.setItem("isAuthenticated", "false");
  localStorage.setItem("strapiToken", "null");
  localStorage.setItem("roleId", "null");
  return <Navigate to="/login" replace />;
}

export default Logout;
