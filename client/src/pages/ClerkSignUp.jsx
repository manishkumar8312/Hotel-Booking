
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-md p-4",
            formFieldInput: "border border-gray-300 rounded px-2 py-1",
          },
        }}
        redirectUrl="/select-role"
      />
    </div>
  );
}

