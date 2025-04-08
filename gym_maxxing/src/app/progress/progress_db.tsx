'use server';

import { neon } from '@neondatabase/serverless'; // used for database querying
import { StepData } from '@/app/lib/types';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function FetchStepsData(userId: number, timePeriod: string) {
    try {   
        // Calculate the beginning of the date range 
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(timePeriod));
        const startFormatted = startDate.toISOString().split('T')[0];

        // Execute the query
        const result = await sql`
            SELECT entry_date, step_count 
            FROM Progress 
            WHERE member_id = ${userId}
            AND entry_date BETWEEN ${startFormatted} AND CURRENT_DATE 
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
        // Insert if user has not yet inserted today, else update the value
        await sql`
            INSERT INTO Progress (member_id, step_count, entry_date)
            VALUES (${userId},${stepCount}, CURRENT_DATE)
            ON CONFLICT (member_id, entry_date)
            DO UPDATE SET step_count = EXCLUDED.step_count;`; 
        return {success: true, errormsg: ''};
    } catch (error) {
        console.error('Error logging steps:', error);
        return {success: false, errormsg: 'Failed to log steps'};
    }
}