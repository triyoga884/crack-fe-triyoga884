'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (optional)
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-7xl font-bold text-gray-800">500</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        An unexpected error occurred. Please try again or come back later.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Try again
        </button>

        <a
          href="/"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
