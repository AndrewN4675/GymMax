'use client';

import { useFormState } from 'react-dom';
import { SubmitButton } from './submit-button';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function EmailForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ success: boolean; email?: string; error?: string }>;
}) {
  const router = useRouter();
  const [state, formAction] = useFormState(
    (prevState: { success: boolean; email?: string; error?: string }, formData: FormData) => action(formData),
    { success: false, email: '', error: '' }
  );

  useEffect(() => {
    if (state.success && state.email) {
      router.push(`/reset-password/verify?email=${encodeURIComponent(state.email)}`);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 text-md"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="somebody@example.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
          px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
          focus:ring-black sm:text-sm text-black"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <SubmitButton>Send Reset Code</SubmitButton>
      <p className="text-center text-sm text-gray-600">
        {"Remember your password? "}
        <Link href="/login" className="font-semibold text-gray-800 underline">Log in</Link>
      </p>
    </form>
  );
}