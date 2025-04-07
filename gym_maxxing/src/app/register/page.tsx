import Link from 'next/link';
import { Form } from './form';
import { CreateMember } from './member';
import { SubmitButton } from './submit-button';
import { redirect } from 'next/navigation';
import Layout from '../components/Layout';

export default function Register() {
  return (
    <Layout title="GymMax | Register">
      <div className="flex items-center justify-center py-12">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-300 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold text-black">Register</h3>
            <p className="text-sm text-gray-500">
              Create your Gym Max account
            </p>
          </div>
          <Form
            action={async (formData: FormData) => {
              'use server';
              const username = formData.get('username') as string;
              const firstName = formData.get('firstName') as string;
              const lastName = formData.get('lastName') as string;
              const dob = formData.get('dateOfBirth') as string;
              const phoneNumber = formData.get('phoneNumber') as string;
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;
              try {
                await CreateMember(phoneNumber, dob, email, username, password, firstName, lastName); // Call the signIn function here
                console.log('Login successful!');
                // Redirect to the dashboard or a protected page after login success
                redirect('/'); 
              } catch (error) {
                console.error('Login failed:', error);
                //alert(error.message); // Show the error message to the user
                alert("Authentication failed");
              }
            }}
          >
            <SubmitButton>Create Account</SubmitButton>
            <p className="text-center text-sm text-gray-600">
              {"Already have an account? "}
              <Link href="/login" className="font-semibold text-gray-800 underline">Log in</Link>
            </p>
          </Form>
        </div>
      </div>
    </Layout>
  );
}