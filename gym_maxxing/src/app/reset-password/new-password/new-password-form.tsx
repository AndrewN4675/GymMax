'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SubmitButton } from '../submit-button';

export function NewPasswordForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError('');
    
    // Add email to formData
    formData.append('email', email);
    
    try {
      const result = await action(formData);
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (e) {
      setError('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 text-md"
        >
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
          px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
          focus:ring-black sm:text-sm text-black"
        />
      </div>
      
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs text-gray-600 text-md"
        >
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
          px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
          focus:ring-black sm:text-sm text-black"
        />
      </div>
      {isPending ? (
        <p className="text-sm text-blue-500">Updating password...</p>
      ) : error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      <SubmitButton>Reset Password</SubmitButton>
    </form>
  );
}