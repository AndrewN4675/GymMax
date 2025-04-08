'use server';

import { neon } from '@neondatabase/serverless'; // used for database querying
import { StepData } from '@/app/lib/types';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function FetchStepsData(userId: number, timePeriod: string) {
    try {   
        // Calculate the beginning and end of the date range
        const endDate = new Date();
        const endDateFormatted = endDate.toISOString().split('T')[0];
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - parseInt(timePeriod) + 1);
        const startFormatted = startDate.toISOString().split('T')[0];

        // Execute the query
        const result = await sql`
            SELECT entry_date, step_count 
            FROM Progress 
            WHERE member_id = ${userId}
            AND entry_date BETWEEN ${startFormatted} AND ${endDateFormatted}
            ORDER BY entry_date ASC;`;

        // Format the data for the chart
        const formattedData: StepData[] = result.map(row => ({
            date: new Date(row.entry_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            steps: row.step_count
        }));

        return {success: true, data: formattedData, errormsg: ''};
    } catch (error) {
        console.error('Error fetching steps data:', error);
        return {success: false, data: [], errormsg: 'Failed to load steps data'};
    }
}

export async function LogSteps(userId: number, stepCount: number) {
    try {
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];

        // Insert if user has not yet inserted today, else update the value
        await sql`
            INSERT INTO Progress (member_id, step_count, entry_date)
            VALUES (${userId}, ${stepCount}, ${todayFormatted})
            ON CONFLICT (member_id, entry_date)
            DO UPDATE SET step_count = EXCLUDED.step_count;`; 
        return {success: true, errormsg: ''};
    } catch (error) {
        console.error('Error logging steps:', error);
        return {success: false, errormsg: 'Failed to log steps'};
    }
}