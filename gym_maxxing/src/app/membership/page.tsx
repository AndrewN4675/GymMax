"use client"

import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
}

export default function Membership(): React.ReactElement {
  const membershipPlans: MembershipPlan[] = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      duration: '1 month',
      price: '$49.99',
      description: 'Perfect for those testing the waters or with short-term fitness goals.',
      features: [
        'Full gym access',
        'Basic fitness assessment',
        'Access to group classes',
        'No commitment'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      duration: '3 months',
      price: '$129.99',
      description: 'Great for seasonal training or those with medium-term goals.',
      features: [
        'Full gym access',
        'Comprehensive fitness assessment',
        'Access to all group classes',
        '1 free personal training session'
      ]
    },
    {
      id: 'biannual',
      name: 'Biannual Plan',
      duration: '6 months',
      price: '$239.99',
      description: 'Ideal for dedicated gym-goers committed to reaching significant fitness goals.',
      features: [
        'Full gym access',
        'Advanced fitness assessment',
        'Priority booking for classes',
        '2 free personal training sessions',
        'Nutrition consultation'
      ]
    },
    {
      id: 'annual',
      name: 'Annual Plan',
      duration: '12 months',
      price: '$449.99',
      description: 'Our best value option for serious fitness enthusiasts.',
      features: [
        'Full gym access',
        'Quarterly fitness assessments',
        'Priority booking for classes',
        '4 free personal training sessions',
        'Nutrition consultation',
        'Free guest passes (2 per month)',
        '10% discount on merchandise'
      ]
    }
  ];

  return (
    <Layout title="GymMax | Membership">
      <div className="container mx-auto max-w-6xl">
        <section className="bg-[#a3ccd0] py-12 px-6 text-center rounded-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Membership Plans</h1>
          <p className="text-lg text-white my-5">Choose the perfect plan for your fitness journey</p>
        </section>
        
        <section className="mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipPlans.map((plan) => (
              <div key={plan.id} className="bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300 flex flex-col">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h2>
                <p className="text-3xl font-bold text-gray-900 mb-2">{plan.price}</p>
                <p className="text-gray-600 mb-2">{plan.duration}</p>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Features:</h3>
                <ul className="mb-6 text-gray-600 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/signup?plan=${plan.id}&duration=${plan.duration.split(' ')[0]}`} 
                  className="bg-gray-900 text-white px-6 py-3 rounded text-lg font-medium hover:bg-gray-800 transition-colors duration-300 text-center mt-auto"
                >
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I cancel my membership?</h3>
              <p className="text-gray-600">Yes, you can cancel your monthly membership at any time with no cancellation fee. For longer-term memberships, cancellation terms apply as specified in your membership agreement.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Are there any additional fees?</h3>
              <p className="text-gray-600">Your membership includes all standard gym facilities and group classes. Personal training sessions beyond those included in your plan are available at additional cost.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Can I freeze my membership?</h3>
              <p className="text-gray-600">Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Is there a family discount?</h3>
              <p className="text-gray-600">Yes! We offer a 10% discount for each additional family member on the same membership plan.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}