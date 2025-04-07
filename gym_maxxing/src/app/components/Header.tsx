"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header(): React.ReactElement {
  const pathname = usePathname();
  
  const isActive = (path: string): string => {
    return pathname === path ? 'underline' : '';
  };
  
  return (
    <header className="bg-[#a3ccd0] py-4 shadow-md">
      <nav className="container mx-auto px-4 relative">
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex space-x-3">
            <Link href="/signup" className="px-4 py-2 bg-white text-[#a3ccd0] font-medium rounded hover:bg-gray-100 transition-colors duration-300">Sign Up</Link>
            <Link href="/login" className="px-4 py-2 border border-white text-white font-medium rounded hover:bg-white hover:text-[#a3ccd0] transition-colors duration-300">Login</Link>
          </div>
        </div>
        
        <ul className="flex justify-center space-x-6">
          <li><Link href="/" className={`text-white font-medium text-lg hover:text-gray-800 transition-colors duration-300 ${isActive('/')}`}>Home</Link></li>
          <li><Link href="/membership" className={`text-white font-medium text-lg hover:text-gray-800 transition-colors duration-300 ${isActive('/membership')}`}>Membership</Link></li>
          <li><Link href="/classes" className={`text-white font-medium text-lg hover:text-gray-800 transition-colors duration-300 ${isActive('/classes')}`}>Classes</Link></li>
          <li><Link href="/trainers" className={`text-white font-medium text-lg hover:text-gray-800 transition-colors duration-300 ${isActive('/trainers')}`}>Trainers</Link></li>
          <li><Link href="/contact" className={`text-white font-medium text-lg hover:text-gray-800 transition-colors duration-300 ${isActive('/contact')}`}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}