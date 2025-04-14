"use client"

import { redirect } from 'next/navigation'
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { FetchTrainers } from './trainerfetch'
import { updateTrainerInfo } from './trainerupdate'
import { useEffect, useState } from "react";
import { Trainer } from '../lib/types';
import './style.css'

export default function Login() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');

  const gymId = process.env.NEXT_PUBLIC_GYM_ID || '1';

  // fetch trainer info based on the gymId
  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
          const result = await FetchTrainers(gymId);
          setTrainers(result);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [gymId]); // refresh trainers  on a change of gymId

  // formats the phone number as '(888) 888-8888'
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

  const handleSubmitChanges = async () => {
    try {
      // Update the trainers
      const response = await updateTrainerInfo(trainers);

      if (response.success) {
        alert('Trainer information updated successfully!');
      } else {
        alert('Failed to update trainer information.');
      }
    } catch (error) {
      console.error('Error submitting changes:', error);
      alert('Error submitting changes.');
    }
  };

  if(loading) {
    return(
      <div className='text-center py-12'>
        <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#a3ccd0] border-r-transparent'/>
        <p className='mt-4'>Loading trainers...</p>
      </div>
    );
  }

  return (
    <Layout title='GymMax | Trainers'>
      <div className='container mx-auto max-w-6xl'>
        <Card className='py-8 px-6 mx-8 my-4 text-center'>
          <h1 className='text-3xl md:text-5xl font-bold'>Manage Your Trainers</h1>
          <p className='text-lg my-5'>
            View all your current trainers and edit their information. TODO ADD INSERTING AND REMOVING
          </p>
        </Card>

        {trainers.map((trainer) => (
          <Card key={trainer.trainerId} className='py-8 px-6 mx-8 my-4'>
            <CardContent>
            <div className='flex flex-col md:flex-row items-start gap-6'>
              <img 
                src={trainer.pictureUrl} className='w-[250px] h-[250px] border-2 border-gray-200 object-cover rounded-lg'
              /> {/*TODO: ADD THE ABILITY TO CHANGE THE IMAGE, REMOVES OLD IMAGES FROM THE BLOB DB*/}
              <div className='text-left' style={{width: '100%'}}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    id='FirstNameInput' 
                    type='text' 
                    maxLength={25}
                    placeholder='First name' 
                    className='input-style'
                    style={{ width: '25%' }}
                  />
                  <input 
                    id='LastNameInput' 
                    type='text' 
                    maxLength={25}
                    placeholder='Last name' 
                    className='input-style'
                    style={{ width: '25%' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    id='EmailInput' 
                    type='email'
                    autoComplete="email" 
                    maxLength={64}
                    placeholder='somebody@example.com' 
                    className='input-style'
                    style={{ width: '52.25%' }}
                  />
                  <input
                    id='PhoneInput'
                    type='tel'
                    value={phone}
                    onChange={formatPhone}
                    maxLength={16}
                    placeholder='(888) 888-8888'
                    className='input-style'
                    style={{ width: '47.75%' }}
                  />
                </div>
                <hr style={{ border: '0', borderTop: '2px solid #ccc', margin: '8px 0' }}/>
                <textarea 
                  id='BioInput'
                  className='input-style' 
                  maxLength={500}
                  placeholder='somebody@example.com' 
                  style={{ height: '8rem', width: '100%', resize: "none"}} 
                />
                <input 
                  id='ExpertiseInput' 
                  type='text' 
                  maxLength={100}
                  placeholder='Expertise' 
                  className='input-style'
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            </CardContent>
          </Card>
        ))}  
      </div>
      
    </Layout>
  );
}