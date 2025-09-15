import ProtectedRoute from "../../components/ProtectedRoute";

const HotelOwnerRoute = ({ children }) => {
    
  return (
    <ProtectedRoute allowedRoles={['hotelOwner']}>
      {children}
    </ProtectedRoute>
  );
};

export default HotelOwnerRoute;