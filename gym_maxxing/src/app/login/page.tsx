import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Form } from './form';
import { SubmitButton } from './submit-button';
import { Authenticate } from './auth';

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
            const id = formData.get('identification') as string;
            const password = formData.get('password') as string;
              
            console.log("Attempting to authenticate user");
          
            const result = await Authenticate(id, password); // Authenticate the users inputs

            const { username, member_id } = result;

            // call the createSession API route to create a session
            const sessionResponse = await fetch('https://gymmax.vercel.app/api/createSession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member_id, username }),
                credentials: 'include',
            });

            if (!sessionResponse.ok) {
              return { success: false, error: 'Failed to create session' };
            }
        
            if(result.redirect) { // Redirect user to page that authentication determined
              redirect(result.redirect);
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