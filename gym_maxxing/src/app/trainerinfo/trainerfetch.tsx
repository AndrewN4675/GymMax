"use server"
import { neon } from '@neondatabase/serverless';
import { Trainer } from '../lib/types';

export async function FetchTrainers(gymId: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const defaultProfile = 'https://ea9ukfncuamxkqnm.public.blob.vercel-storage.com/default_pfp-ZHTINW6O4yDsoMAOhtjrDAtVuiAuCa.png';

    const result = await sql`
        SELECT * FROM Trainer
        WHERE gym_id = ${parseInt(gymId)};`;

    if(result.length === 0) {
        return [];
    }

    const formattedData: Trainer[] = result.map(row => ({
        trainerId: row.trainerid,
        firstName: row.firstname,
        lastName: row.lastname,
        trainerName: '', // Do not care about it here
        phone: row.phonenumber,
        email: row.email,
        expertise: row.expertise,
        bio: row.bio,
        pictureUrl: row.picture_url || defaultProfile // use default profile if its NULL
      }));

    return formattedData;
}