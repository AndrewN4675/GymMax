import Link from 'next/link';
import { EmailForm } from './email-form';
import { RequestReset } from './reset';
import { SubmitButton } from './submit-button';
import Layout from '../components/Layout';

export default function ResetPassword() {
  return (
    <Layout title="GymMax | Reset Password">
      <div className="flex items-center justify-center py-12">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-300 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold text-black">Reset Password</h3>
            <p className="text-sm text-gray-500">
              Enter your email address to reset your password
            </p>
          </div>
          <EmailForm
            action={async (formData: FormData) => {
              'use server';
              const email = formData.get('email') as string;
              
              try {
                const result = await RequestReset(email);
                if (result.success) {
                  // Redirect to verification page with email as query param
                  return { success: true, email };
                } else {
                  return { success: false, error: "Failed to send reset code" };
                }
              } catch (error) {
                console.error('Reset request failed:', error);
                return { success: false, error: "Email not found" };
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
}