import Link from 'next/link';

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
            htmlFor="email"
            className="block text-xs text-gray-600
            text-md"
          >
            Email or Username
          </label>
          <input
            id="identification"
            name="identification" 
            type="text"
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
        {/*
        <Link href="/recover_password" className="text-blue-500 text-sm">
            Forgot your password?
        </Link>
        */}
        </div>
        {children}
      </form>
    );
  }
  