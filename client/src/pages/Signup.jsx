import React from 'react';
import { SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';

const Signup = () => {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isPlaceholder = !key || key === 'pk_test_demo';
  return (
    <div className="flex items-center justify-center py-16 min-h-[70vh]">
      <div className="w-full max-w-md">
        {isPlaceholder ? (
          <div className="p-6 rounded-lg border bg-[var(--surface,#0b1220)] text-[var(--text,#c7d2fe)]">
            <h2 className="text-xl font-semibold mb-2">Clerk not configured</h2>
            <p className="text-gray-400 mb-4">Add VITE_CLERK_PUBLISHABLE_KEY in client/.env to render the signup form.</p>
            <div className="flex gap-3">
              <a href="/rooms" className="px-4 py-2 rounded-md border">Browse Rooms</a>
              <a href="/" className="px-4 py-2 rounded-md bg-orange-500 text-white">Go Home</a>
            </div>
          </div>
        ) : (
          <>
            <SignedOut>
              <SignUp routing="path" path="/signup" signInUrl="/login" />
            </SignedOut>
            <SignedIn>
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-semibold">You're already signed in</h1>
                <a className="px-4 py-2 rounded-md bg-orange-500 text-white" href="/">Go Home</a>
              </div>
            </SignedIn>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
