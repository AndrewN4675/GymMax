'use client';
import { useState, useEffect, JSX } from 'react';
import { useRouter } from 'next/navigation';
// Import components
import StepForm from '@/app/components/StepForm';
import StepChart from '@/app/components/StepChart';
import StepHistory from '@/app/components/StepHistory';
import { StepData, ApiResponse, StepLog } from '@/app/lib/types';

// Neon database client - typically would be in a separate utility file
import { Pool } from '@neondatabase/serverless';

export default function ProgressPage(): JSX.Element {
  const router = useRouter();
  
  // Hardcoded user ID - to be updated later
  const userId = "user_123456789";
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  const [timePeriod, setTimePeriod] = useState<string>('7');
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    fetchStepsData();
  }, [timePeriod]);
  
  const fetchStepsData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Create a new connection to the Neon database
      const pool = new Pool({
        connectionString: process.env.NEXT_PUBLIC_NEON_DATABASE_URL
      });
      
      // Calculate date range based on selected time period
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - parseInt(timePeriod));
      
      // Format dates for SQL query
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      // Query to fetch step data for the given user and date range
      const query = `
        SELECT log_date, step_count 
        FROM step_logs 
        WHERE user_id = $1 
        AND log_date BETWEEN $2 AND $3 
        ORDER BY log_date ASC
      `;
      
      // Execute the query
      const result = await pool.query(query, [userId, formattedStartDate, formattedEndDate]);
      
      // Format the data for the chart
      const formattedData: StepData[] = result.rows.map(row => ({
        date: new Date(row.log_date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        steps: parseInt(row.step_count)
      }));
      
      setStepsData(formattedData);
      
      // Close the connection
      await pool.end();
      
    } catch (error) {
      console.error('Error fetching steps data:', error);
      setError('Failed to load steps data');
      
      // Fallback to sample data in case of database connection issues
      const fallbackData: StepData[] = [
        { date: 'Mar 10', steps: 8432 },
        { date: 'Mar 11', steps: 10567 },
        { date: 'Mar 12', steps: 7895 },
        { date: 'Mar 13', steps: 9234 },
        { date: 'Mar 14', steps: 6543 },
        { date: 'Mar 15', steps: 12045 },
        { date: 'Mar 16', steps: 8765 },
      ];
      setStepsData(fallbackData);
      
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStepsLogged = async (stepCount: number): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Create a new connection to the Neon database
      const pool = new Pool({
        connectionString: process.env.NEXT_PUBLIC_NEON_DATABASE_URL
      });
      
      // Today's date for the log
      const today = new Date().toISOString().split('T')[0];
      
      // Query to insert or update step count for today
      const query = `
        INSERT INTO step_logs (user_id, log_date, step_count)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, log_date) 
        DO UPDATE SET step_count = $3
      `;
      
      // Execute the query
      await pool.query(query, [userId, today, stepCount]);
      
      // Close the connection
      await pool.end();
      
      // Refresh the step data
      fetchStepsData();
      
    } catch (error) {
      console.error('Error logging steps:', error);
      setError('Failed to log steps');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && stepsData.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Step Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step Form Component */}
        <StepForm 
          onStepsLogged={handleStepsLogged} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
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