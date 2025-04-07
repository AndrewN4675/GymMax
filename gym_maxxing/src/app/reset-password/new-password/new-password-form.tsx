'use client';

import { useFormState } from 'react-dom';
import { SubmitButton } from '../submit-button';
import { useSearchParams } from 'next/navigation';

export function NewPasswordForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [state, formAction] = useFormState(
    (prevState: { success: boolean; error?: string }, formData: FormData) => {
      // Add email to formData
      formData.append('email', email);
      return action(formData);
    },
    { success: false, error: '' }
  );

  return (
    <form
      action={formAction}
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

      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <SubmitButton>Reset Password</SubmitButton>
    </form>
  );
}