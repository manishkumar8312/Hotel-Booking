import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

export default function SelectRolePage() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !user) return;

    setIsSubmitting(true);
    
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          role: role
        }
      });
      
      // Redirect to dashboard or home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If user already has a role, redirect them
  if (user?.unsafeMetadata?.role) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Your Role</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choose your role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a role...</option>
              <option value="user">User</option>
              <option value="hotelOwner">Hotel Owner</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!role || isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}