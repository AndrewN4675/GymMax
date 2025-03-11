import Link from 'next/link';
import { neon } from '@neondatabase/serverless';

export function Form({
    action,
    children,
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    return (
      <form
        action={action}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
          <div>
          <label
            htmlFor="username"
            className="block text-xs text-gray-600
            text-md"
          >
            username 
          </label>
          <input
            id="username"
            name="username" 
            type="text"
            placeholder="username"
            autoComplete="username"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
            px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
            focus:ring-black sm:text-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs text-gray-600
            text-md"
          >
            firstName 
          </label>
          <input
            id="firstName"
            name="firstName" 
            type="text"
            placeholder="first name"
            autoComplete="firstName"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
            px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
            focus:ring-black sm:text-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-xs text-gray-600
            text-md"
          >
            lastName 
          </label>
          <input
            id="lastName"
            name="lastName" 
            type="text"
            placeholder="last name"
            autoComplete="lastName"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
            px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
            focus:ring-black sm:text-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-xs text-gray-600
            text-md"
          >
            dateOfBirth 
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth" 
            type="date"
            placeholder="YYYY-MM-DD"
            autoComplete="dateOfBirth"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
            px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
            focus:ring-black sm:text-sm text-black"
          />
        </div>
         <div>
          <label
            htmlFor="phoneNumber"
            className="block text-xs text-gray-600
            text-md"
          >
            phoneNumber 
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber" 
            type="text"
            placeholder="phone number"
            autoComplete="phoneNumber"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 
            px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none 
            focus:ring-black sm:text-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gray-600
            text-md"
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
        <div>
        <label
            htmlFor="password"
            className="block text-xs text-gray-600
            text-md"
          >
            Password
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
        {children}
      </form>
    );
  }
  