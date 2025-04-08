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