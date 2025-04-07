"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

interface Trainer {
  id: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
  specialties?: string[] | string;
  bio?: string;
  certifications?: string;
}

export default function Trainers(): React.ReactElement {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSpecialty, setActiveSpecialty] = useState<string>('all');
  
  // This would come from your app's configuration or context
  const gymId = process.env.NEXT_PUBLIC_GYM_ID || '1';

  useEffect(() => {
    const fetchTrainers = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`/api/trainers?gym_id=${gymId}${activeSpecialty !== 'all' ? `&specialty=${activeSpecialty}` : ''}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch trainers');
        }
        
        const data = await response.json();
        setTrainers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [gymId, activeSpecialty]);

  // Extract unique specialties from all trainers for filtering
  const getSpecialties = (): string[] => {
    const specialtySet = new Set<string>();
    trainers.forEach(trainer => {
      if (trainer.specialties) {
        const specialtiesArray = Array.isArray(trainer.specialties) 
          ? trainer.specialties 
          : trainer.specialties.split(',').map(s => s.trim());
        
        specialtiesArray.forEach(specialty => specialtySet.add(specialty));
      }
    });
    return Array.from(specialtySet);
  };

  // Filter trainers based on active specialty
  const filteredTrainers = activeSpecialty === 'all' 
    ? trainers 
    : trainers.filter(trainer => {
        if (!trainer.specialties) return false;
        
        const specialtiesArray = Array.isArray(trainer.specialties) 
          ? trainer.specialties 
          : trainer.specialties.split(',').map(s => s.trim());
        
        return specialtiesArray.includes(activeSpecialty);
      });

  return (
    <Layout title="GymMax | Trainers">
      <div className="container mx-auto max-w-6xl">
        <section className="bg-[#a3ccd0] py-12 px-6 text-center rounded-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Our Trainers</h1>
          <p className="text-lg text-white my-5">Meet our expert fitness professionals ready to help you achieve your goals</p>
        </section>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#a3ccd0] border-r-transparent"></div>
            <p className="mt-4">Loading trainers...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>Error: {error}</p>
            <p className="mt-2">Please try again later or contact support.</p>
          </div>
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Filter by Specialty:</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSpecialty('all')}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeSpecialty === 'all' 
                      ? 'bg-[#a3ccd0] text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  All Specialties
                </button>
                
                {getSpecialties().map(specialty => (
                  <button
                    key={specialty}
                    onClick={() => setActiveSpecialty(specialty)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      activeSpecialty === specialty 
                        ? 'bg-[#a3ccd0] text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </section>
            
            {filteredTrainers.length === 0 ? (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <p className="text-gray-600">No trainers found with the selected specialty.</p>
                <button
                  onClick={() => setActiveSpecialty('all')}
                  className="mt-4 px-4 py-2 bg-[#a3ccd0] text-white rounded hover:bg-opacity-90 transition-colors"
                >
                  View All Trainers
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrainers.map(trainer => (
                  <div key={trainer.id} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden flex flex-col">
                    <div className="h-80 bg-gray-200 relative">
                      {trainer.profile_image ? (
                        <img
                          src={trainer.profile_image}
                          alt={`${trainer.first_name} ${trainer.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500 text-lg">No Image Available</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {trainer.first_name} {trainer.last_name}
                      </h2>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Array.isArray(trainer.specialties) 
                          ? trainer.specialties.map(specialty => (
                              <span key={specialty} className="px-3 py-1 bg-[#a3ccd0] bg-opacity-20 text-[#2a7c83] rounded-full text-sm">
                                {specialty}
                              </span>
                            ))
                          : trainer.specialties?.split(',').map(specialty => (
                              <span key={specialty.trim()} className="px-3 py-1 bg-[#a3ccd0] bg-opacity-20 text-[#2a7c83] rounded-full text-sm">
                                {specialty.trim()}
                              </span>
                            ))
                        }
                      </div>
                      
                      <p className="mt-4 text-gray-600">
                        {trainer.bio ? (
                          trainer.bio.length > 150 
                            ? `${trainer.bio.substring(0, 150)}...` 
                            : trainer.bio
                        ) : (
                          "No bio available"
                        )}
                      </p>
                      
                      {trainer.certifications && (
                        <div className="mt-4">
                          <h3 className="font-semibold text-gray-900">Certifications:</h3>
                          <p className="text-gray-600">{trainer.certifications}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="px-6 pb-6 pt-2 mt-auto">
                      <Link 
                        href={`/trainers/${trainer.id}`} 
                        className="block w-full bg-gray-900 text-white py-3 px-4 rounded text-center font-medium hover:bg-gray-800 transition-colors"
                      >
                        View Profile
                      </Link>
                      
                      <Link 
                        href={`/book-session?trainer_id=${trainer.id}`} 
                        className="block w-full mt-2 border-2 border-gray-900 text-gray-900 py-3 px-4 rounded text-center font-medium hover:bg-gray-100 transition-colors"
                      >
                        Book a Session
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}