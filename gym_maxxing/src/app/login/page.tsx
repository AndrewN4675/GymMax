import Link from 'next/link';
import { Form } from './form';
import { SubmitButton } from './submit-button';
import { Authenticate } from './auth'

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-300 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-black">Login</h3>
          <p className="text-sm text-gray-500">
            Log in to Your GymMax Account
          </p>
        </div>
        <Form
          action={async (formData: FormData) => {
            'use server';
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            try {
              await Authenticate(email, password); // Call the signIn function here
              console.log('Login successful!');
              // Redirect to the dashboard or a protected page after login success
            } catch (error) {
              console.error('Login failed:', error);
              //alert(error.message); // Show the error message to the user
              alert("Authentication failed");
            }
          }}
        >
            
          <SubmitButton>Sign in</SubmitButton>

          

          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800 underline"> Sign up </Link>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  );
}