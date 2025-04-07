// app/success/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Success() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <Layout title="GymMax | Registration Successful">
      <div className="flex items-center justify-center py-12">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-300 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <svg
              className="h-16 w-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-xl font-semibold text-black">Account Created Successfully!</h3>
            <p className="text-sm text-gray-500">
              Your GymMax account has been created. You can now log in and start your fitness journey.
            </p>
          </div>
          <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
            <p className="text-center text-sm text-gray-600">
              Redirecting to home page in {countdown} seconds...
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                href="/login"
                className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all 
                bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login Now
              </Link>
              <Link
                href="/"
                className="flex h-10 w-full items-center justify-center rounded-md border border-gray-300 text-sm transition-all 
                bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}