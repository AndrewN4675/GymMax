'use client'

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { FetchTrainers } from './trainers-db'
import { Trainer } from '../lib/types';

export default function Trainers(): React.ReactElement {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSpecialty, setActiveSpecialty] = useState<string>('all');
  
  // This would come from the app's configuration or context
  const gymId = process.env.NEXT_PUBLIC_GYM_ID || '1';

  // fetch trainer info based on the gymId
  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
          const result = await FetchTrainers(gymId);
          setTrainers(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [gymId]); // refresh trainers  on a change of gymId

  if(loading) {
    return(
      <div className='text-center py-12'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#a3ccd0] border-r-transparent'/>
        <p className='mt-4'>Loading trainers...</p>
      </div>
    );
  } else if(error) {
    return(
      <div className='text-center py-12 text-red-600'>
        <p>Error: {error}</p>
        <p className='mt-2'>Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <Layout title='GymMax | Trainers'>
      <div className='container mx-auto max-w-6xl'>
      
        <Card className='py-8 px-6 mx-8 my-4 text-center'>
          <h1 className='text-3xl md:text-5xl font-bold'>Meet Our Trainers</h1>
          <p className='text-lg my-5'>
            Meet our expert and professional trainers ready to help you achieve your fitness goals
          </p>
        </Card>

        {trainers.map((trainer) => (
          <Card key={trainer.trainerId} className='py-8 px-6 mx-8 my-4'>
            <div className='flex flex-col md:flex-row items-start gap-6'>
              <img 
                src={trainer.pictureUrl} className='w-[250px] h-[250px] border-2 border-gray-200 object-cover rounded-lg'
              />
              <div className='text-left' style={{width: '100%'}}>
                <h2 className='text-4xl font-bold mb-2'>{trainer.trainerName}</h2>
                <h2 className='mb-4'>{trainer.email}</h2>
                <hr style={{ border: '0', borderTop: '2px solid #ccc', margin: '8px 0' }}/>
                <p className='h-32'>{trainer.bio || 'Trainer has no biography at the moment!'}</p>
                <p className='mb-4'>
                  <span className='font-semibold'>Expertise: </span>
                    {trainer.expertise || 'Trainer has no expertise listed at the moment!'}
                </p>
              </div>
            </div>
          </Card>
        ))}  
      </div>
    </Layout>
  );
}