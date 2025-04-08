'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StepData } from '@/app/lib/types';
import { JSX } from 'react';

interface StepChartProps {
  stepsData: StepData[];
  timePeriod: string;
  setTimePeriod: (period: string) => void;
}

export default function StepChart({ 
  stepsData, 
  timePeriod, 
  setTimePeriod 
}: StepChartProps): JSX.Element {
  // Calculate summary statistics
  const totalSteps = stepsData.reduce((sum, day) => sum + day.steps, 0);
  const averageSteps = stepsData.length > 0 ? Math.round(totalSteps / stepsData.length) : 0;

  console.log("Test date ", stepsData[0]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Steps Overview</CardTitle>
        <Select
          value={timePeriod}
          onValueChange={setTimePeriod}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {stepsData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No step data available. Start logging your steps!
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="steps" fill="#3B82F6" name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {stepsData.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Summary</h3>
            <p>Total Steps: {totalSteps.toLocaleString()}</p>
            <p>Daily Average: {averageSteps.toLocaleString()} steps</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}