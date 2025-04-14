'use client'

import { useState } from 'react';

export function Form(
  {
    action,
    children,
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    const [phone, setPhone] = useState<string>('');

    const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const digits = value.replace(/\D/g, ''); // Remove non-digits
  
      let formattedPhone = '';
      if (digits.length > 0) formattedPhone += '(' + digits.slice(0, 3);
      if (digits.length >= 3) formattedPhone += ') ';
      if (digits.length >= 4) formattedPhone += digits.slice(3, 6);
      if (digits.length >= 6) formattedPhone += '-' + digits.slice(6, 10);
      setPhone(formattedPhone);
    };

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
            Username 
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
            First Name 
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
            Last Name
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
            Date of Birth
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
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber" 
            type="tel"
            value={phone}
            onChange={formatPhone}
            maxLength={16}
            placeholder='(888) 888-8888'
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
