import React from 'react';

export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-gray-900 text-white py-5 text-center mt-16">
      <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} GymMax | All rights reserved.</p>
    </footer>
  );
}