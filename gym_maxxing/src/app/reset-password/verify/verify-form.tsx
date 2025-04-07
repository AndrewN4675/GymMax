'use client';
import { useActionState } from 'react';
import { SubmitButton } from '../submit-button';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function VerifyForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ success: boolean; email?: string; error?: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [state, formAction, isPending] = useActionState(
    (prevState: { success: boolean; email?: string; error?: string }, formData: FormData) => {
      // Add email to formData
      formData.append('email', email);
      return action(formData);
    },
    { success: false, email: '', error: '' }
  );
  useEffect(() => {
    if (state.success && state.email) {
      router.push(`/reset-password/new-password?email=${encodeURIComponent(state.email)}`);
    }
  }, [state, router]);
  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <p className="mb-4 text-sm text-gray-600">
          We sent a verification code to: <strong>{email}</strong>
        </p>
        <label
          htmlFor="code"
          className="block text-xs text-gray-600 text-md"
        >
          Verification Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          placeholder="6-digit code"
          autoComplete="off"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
          px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
          focus:ring-black sm:text-sm text-black"
        />
      </div>
      {isPending ? (
        <p className="text-sm text-blue-500">Verifying code...</p>
      ) : state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
      <SubmitButton>Verify Code</SubmitButton>
      <p className="text-center text-sm text-gray-600">
        {"Didn't receive a code? "}
        <Link href="/reset-password" className="font-semibold text-gray-800 underline">Try again</Link>
      </p>
    </form>
  );
}