import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoaded } = useUser();

  // Show loading while user data is being fetched
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-up" replace />;
  }

  // Get user role from metadata (adjust based on your solution)
  const userRole = user.unsafeMetadata?.role || user.publicMetadata?.role;

  // If user doesn't have a role assigned, redirect to role selection
  if (!userRole) {
    return <Navigate to="/select-role" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Logged in but not authorized
    return <Unauthorized />;
  }

  // If specific roles are required, check if user has the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-gray-500">
            Required role: {allowedRoles.join(" or ")}
          </p>
          <p className="text-gray-500">
            Your role: {userRole}
          </p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;