import { Suspense } from 'react';
import { NewPasswordForm } from './new-password-form';
import { UpdatePassword } from '../reset';
import Layout from '../../components/Layout';
import { redirect } from 'next/navigation';

export default function NewPassword() {
  async function handlePasswordUpdate(formData: FormData) {
    'use server';
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    // Check if passwords match
    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }
    
    try {
      const result = await UpdatePassword(email, password);
      if (result.success) {
        redirect('/login?reset=success');
      } else {
        return { success: false, error: "Failed to update password" };
      }
    } catch (error) {
      console.error('Password update failed:', error);
      return { success: false, error: "Failed to update password" };
    }
  }

  return (
    <Layout title="GymMax | Set New Password">
      <div className="flex items-center justify-center py-12">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-300 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold text-black">Set New Password</h3>
            <p className="text-sm text-gray-500">
              Create a new password for your account
            </p>
          </div>
          <Suspense fallback={<FormSkeleton />}>
            <NewPasswordForm action={handlePasswordUpdate} />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

// Loading skeleton to show while the form is loading
function FormSkeleton() {
  return (
    <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 animate-pulse">
      <div className="h-10 w-full bg-gray-200 rounded"></div>
      <div className="h-10 w-full bg-gray-200 rounded"></div>
      <div className="h-10 w-full bg-gray-300 rounded"></div>
    </div>
  );
}