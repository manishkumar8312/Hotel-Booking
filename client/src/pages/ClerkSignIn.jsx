import { useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-md p-4",
            formFieldInput: "border border-gray-300 rounded px-2 py-1",
          },
        }}
        afterSignIn={(user) => {
          navigate("/select-role"); // ✅ Custom redirect after success
        }}
        // redirectUrl="/select-role"
      />
    </div>
  );
}

