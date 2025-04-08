'use client';

import { JSX, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogSteps } from './progress_db';

export default function StepForm({userId}: {userId: number}) {
  const [stepCount, setStepCount] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    const steps = parseInt((document.getElementById('steps') as HTMLInputElement).value);
    setStepCount(steps);

    const handleStepsLogged = async () => {
      const result = await LogSteps(userId, steps);
      if(result.success) {
        //window.location.reload(); // refresh page to show updated table
      }
      else {
        setError(result.errormsg);
      }
    }
    handleStepsLogged();
  }


  /*
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!stepCount || isNaN(parseInt(stepCount)) || parseInt(stepCount) <= 0) {
      setError('Please enter a valid number of steps');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/steps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stepCount: parseInt(stepCount) }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStepCount('');
        // Notify parent component to refresh the data
        onStepsLogged(parseInt(stepCount));
      } else {
        setError(result.error || 'Failed to log steps');
      }
    } catch (error) {
      console.error('Error logging steps:', error);
      setError('Failed to log steps. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  */

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Your Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="steps">Number of Steps</Label>
            <Input
              id="steps"
              type="number"
              min="0"
              step={1}
              placeholder="Enter steps"
              className="mt-1"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? 'Logging...' : 'Log Steps'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}