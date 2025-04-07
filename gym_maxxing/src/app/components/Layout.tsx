"use client"

import React, { useEffect, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ 
  children, 
  title = 'GymMax' 
}: LayoutProps): React.ReactElement {
  // Next.js App Router uses a different approach for document head
  useEffect(() => {
    // Update the document title
    document.title = title;
  }, [title]);
  
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-4">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}