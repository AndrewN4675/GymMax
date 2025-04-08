'use client';

import { useState, useEffect, JSX } from 'react';
import { useRouter } from 'next/navigation';
import StepForm from './StepForm';
import StepChart from './StepChart';
import StepHistory from './StepHistory';
import { StepData, ApiResponse, StepLog } from '@/app/lib/types';
import { FetchStepsData, LogSteps } from './progress_db';

export default function ProgressPage(): JSX.Element {
  const router = useRouter();
  
  //TODO: Hardcoded user ID - to be updated later
  const userId = 1;
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  const [timePeriod, setTimePeriod] = useState<string>('7');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let data = await FetchStepsData(userId, timePeriod);
      setIsLoading(false);
      if(data.success){
        setStepsData(data.data ?? [])
      }
      else {
        setError(data.errormsg);
      }
    };
    fetchData();
  }, []);
    
  if (isLoading && stepsData.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Step Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step Form Component */}
        <StepForm 
          userId={userId}
        />
        
        {/* Step Chart Component */}
        <StepChart 
          stepsData={stepsData} 
          timePeriod={timePeriod} 
          setTimePeriod={setTimePeriod} 
        />
      </div>
      
      {/* Step History Component */}
      <StepHistory stepsData={stepsData} />
      
      {/* User ID indicator for debugging */}
      <div className="mt-8 text-gray-500 text-sm">
        User ID: {userId} 
      </div>
    </div>
  );
}
