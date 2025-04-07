"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Layout from '../components/Layout';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <Layout title="GymMax | Contact">
      <div className="container mx-auto max-w-4xl">
        <section className="bg-[#a3ccd0] py-12 px-6 text-center rounded-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-lg text-white my-5">We'd love to hear from you. Reach out with any questions or feedback.</p>
        </section>
        
        <section className="mt-10 grid md:grid-cols-2 gap-10">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Address</h3>
              <p className="text-gray-600">123 Fitness Street</p>
              <p className="text-gray-600">Gym City, GC 12345</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Email</h3>
              <p className="text-gray-600">info@gymmax.com</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Hours</h3>
              <p className="text-gray-600">Monday - Friday: 6am - 10pm</p>
              <p className="text-gray-600">Saturday - Sunday: 8am - 8pm</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3ccd0]"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3ccd0]"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3ccd0]"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3ccd0]"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 rounded text-lg font-medium hover:bg-gray-800 transition-colors duration-300 w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
        
        <section className="mt-12">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Find Us</h2>
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map Placeholder</p>
              {/* Integrate with Google Maps or another map service here */}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}