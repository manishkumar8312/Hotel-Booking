import React from 'react';
import { SignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';

const Login = () => {
  const { isLoaded } = useAuth();
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isPlaceholder = !key || key === 'pk_test_demo';

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-500">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16 min-h-[70vh]">
      <div className="w-full max-w-md">
        {isPlaceholder ? (
          <div className="p-6 rounded-lg border bg-[var(--surface,#0b1220)] text-[var(--text,#c7d2fe)]">
            <h2 className="text-xl font-semibold mb-2">Clerk not configured</h2>
            <p className="text-gray-400 mb-4">Add a valid VITE_CLERK_PUBLISHABLE_KEY in <code>client/.env</code> to render the login form.</p>
            <ol className="list-decimal list-inside text-gray-400 space-y-1 mb-4">
              <li>Get a key from your Clerk project (Publishable Key)</li>
              <li>Update <code>client/.env</code> and restart Vite</li>
            </ol>
            <div className="flex gap-3">
              <a href="/rooms" className="px-4 py-2 rounded-md border">Browse Rooms</a>
              <a href="/" className="px-4 py-2 rounded-md bg-orange-500 text-white">Go Home</a>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
