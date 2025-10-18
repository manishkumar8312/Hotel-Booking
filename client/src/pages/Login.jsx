import React from 'react';
import { SignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';

const Login = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-500">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md">
        <SignedOut>
          <SignIn routing="path" path="/login" signUpUrl="/signup" />
        </SignedOut>
        <SignedIn>
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold">You're already signed in</h1>
            <p className="text-gray-500">Continue to your dashboard or browse rooms.</p>
            <div className="flex gap-3 justify-center">
              <a href="/owner" className="px-4 py-2 rounded-md bg-orange-500 text-white">Owner Dashboard</a>
              <a href="/rooms" className="px-4 py-2 rounded-md border">Browse Rooms</a>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Login;
