"use client"

import React from 'react';
import Link from 'next/link';
import Layout from './components/Layout';

export default function Home(): React.ReactElement {
  return (
    <Layout title="GymMax | Home">
      <div className="container mx-auto max-w-4xl">
        <section className="bg-[#a3ccd0] py-12 px-6 text-center rounded-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Welcome to GymMax</h1>
          <p className="text-lg text-white my-5">Your all-in-one gym management solution.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-gray-900 text-white px-8 py-3 rounded text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Get Started
            </Link>
            <Link 
              href="/login" 
              className="bg-white text-gray-900 px-8 py-3 rounded text-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </section>
        
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Membership Management</h3>
              <p className="text-gray-600">Manage your gym membership plans and payments.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Class Scheduling</h3>
              <p className="text-gray-600">Book and schedule fitness classes.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Trainer Profiles</h3>
              <p className="text-gray-600">Explore trainer profiles.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}