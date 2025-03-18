'use client';

import { JSX, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StepFormProps {
  onStepsLogged: (stepCount: number) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function StepForm({ 
  onStepsLogged, 
  isLoading, 
  setIsLoading 
}: StepFormProps): JSX.Element {
  const [stepCount, setStepCount] = useState<string>('');
  const [error, setError] = useState<string>('');

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
        onStepsLogged();
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
              min="1"
              value={stepCount}
              onChange={(e) => setStepCount(e.target.value)}
              placeholder="Enter steps"
              className="mt-1"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Logging...' : 'Log Steps'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}