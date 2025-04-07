import Link from 'next/link';
import { VerifyForm } from './verify-form';
import { VerifyResetCode } from '../reset';
import Layout from '../../components/Layout';
import { Suspense } from 'react';

export default function VerifyReset() {
  return (
    <Layout title="GymMax | Verify Reset Code">
      <div className="flex items-center justify-center py-12">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-300 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold text-black">Verify Reset Code</h3>
            <p className="text-sm text-gray-500">
              Enter the code that was sent to your email
            </p>
          </div>
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <VerifyForm
              action={async (formData: FormData) => {
                'use server';
                const email = formData.get('email') as string;
                const code = formData.get('code') as string;
                
                try {
                  const result = await VerifyResetCode(email, code);
                  if (result.success) {
                    return { success: true, email };
                  } else {
                    return { success: false, error: result.error };
                  }
                } catch (error) {
                  console.error('Verification failed:', error);
                  return { success: false, error: "Verification failed" };
                }
              }}
            />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}