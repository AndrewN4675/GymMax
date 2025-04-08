'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepData } from '@/app/lib/types';
import { JSX } from 'react';

interface StepHistoryProps {
  stepsData: StepData[];
}

export default function StepHistory({ stepsData }: StepHistoryProps): JSX.Element | null {
  if (stepsData.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Step History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border">Date</th>
                <th className="text-right p-2 border">Steps</th>
              </tr>
            </thead>
            <tbody>
              {stepsData.map((day, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{day.date}</td>
                  <td className="text-right p-2 border">{day.steps.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}