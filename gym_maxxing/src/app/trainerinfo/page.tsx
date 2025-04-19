'use client'

import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { FetchTrainers, UpdateTrainerInfo } from './trainerInfo-db'
import { useEffect, useState } from 'react';
import { Trainer } from '../lib/types';
import ImageDropBox from './imageDropBox'
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

  const handleChange = (trainerId: number, field: string, newValue: string) => {
    const updatedTrainers = trainers.map((trainer) => {
      if (trainer.trainerId === trainerId) {
        return {...trainer, [field]: newValue, };
      }
      return trainer;
    });
    setTrainers(updatedTrainers);
  };

  const handleSubmit = async () => {
    try {
      const response = await UpdateTrainerInfo(trainers);

      if (response.success) {
        alert('Trainer information updated successfully!');
      } else {
        alert('Failed to update trainer information.');
      }
    } catch (error) {
      console.error('Error submitting changes:', error);
      alert('Error submitting changes.');
      window.location.reload(); // refresh page to show updated table
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
            <div className='flex flex-col md:flex-row items-start gap-6'>
              <div>
                <img src={trainer.pictureUrl} className='w-[175px] h-[175px] border-2 border-gray-200 object-cover rounded-lg'/>
                <ImageDropBox trainerId={trainer.trainerId}/>
              </div>
              <div className='text-left' style={{width: '100%'}}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    id='FirstNameInput' 
                    type='text' 
                    maxLength={25}
                    placeholder='First name' 
                    className='input-style'
                    style={{ width: '25%' }}
                    value={trainer.firstName || ''}
                    onChange={(e) => handleChange(trainer.trainerId, 'firstName', e.target.value)}
                  />
                  <input 
                    id='LastNameInput' 
                    type='text' 
                    maxLength={25}
                    placeholder='Last name' 
                    className='input-style'
                    style={{ width: '25%' }}
                    value={trainer.lastName || ''}
                    onChange={(e) => handleChange(trainer.trainerId, 'lastName', e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    id='EmailInput' 
                    type='email'
                    autoComplete='email' 
                    maxLength={64}
                    placeholder='somebody@example.com' 
                    className='input-style'
                    style={{ width: '52.25%' }}
                    value={trainer.email || ''}
                    onChange={(e) => handleChange(trainer.trainerId, 'email', e.target.value)}
                  />
                  <input
                    id='PhoneInput'
                    type='tel'
                    maxLength={16}
                    placeholder='(888) 888-8888'
                    className='input-style'
                    style={{ width: '47.75%' }}
                    value={trainer.phone || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const digits = value.replace(/\D/g, '');
                      let formatted = '';
                      if (digits.length > 0) formatted += '(' + digits.slice(0, 3);
                      if (digits.length >= 3) formatted += ') ';
                      if (digits.length >= 4) formatted += digits.slice(3, 6);
                      if (digits.length >= 6) formatted += '-' + digits.slice(6, 10);
                      handleChange(trainer.trainerId, 'phone', formatted);
                    }}
                  />
                </div>
                <hr style={{ border: '0', borderTop: '2px solid #ccc', margin: '8px 0' }}/>
                <textarea 
                  id='BioInput'
                  className='input-style' 
                  maxLength={500}
                  placeholder='Enter trainer bio here...' 
                  style={{ height: '8rem', width: '100%', resize: 'none'}} 
                  value={trainer.bio || ''}
                  onChange={(e) => handleChange(trainer.trainerId, 'bio', e.target.value)}
                />
                <input 
                  id='ExpertiseInput' 
                  type='text' 
                  maxLength={100}
                  placeholder='Expertise' 
                  className='input-style'
                  style={{ width: '100%' }}
                  value={trainer.expertise || ''}
                  onChange={(e) => handleChange(trainer.trainerId, 'expertise', e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}  
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button 
          className='bg-blue-600 hover:bg-blue-700 button-style justify-center' 
          style={{width:'10%'}}
          onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
      
    </Layout>
  );
}