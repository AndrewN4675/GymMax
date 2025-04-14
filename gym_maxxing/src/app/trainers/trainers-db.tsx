'use server'

import { neon } from '@neondatabase/serverless';
import { Trainer } from '../lib/types';

export async function FetchTrainers(gymId: string) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const defaultProfile = 'https://ea9ukfncuamxkqnm.public.blob.vercel-storage.com/default_pfp-ZHTINW6O4yDsoMAOhtjrDAtVuiAuCa.png';

  const result = await sql`  
  SELECT trainerid, CONCAT(firstname, ' ', lastname) trainer_name, expertise, email, bio, picture_url
  FROM Trainer WHERE gym_id = ${parseInt(gymId)};`;

  if(result.length === 0) {
    return [];
  }

  const formattedData: Trainer[] = result.map(row => ({
    trainerId: row.trainerid,
    trainerName: row.trainer_name,
    expertise: row.expertise,
    email: row.email,
    bio: row.bio,
    pictureUrl: row.picture_url || defaultProfile // vercel blob uploads to a public url in our case 
  }));

  return formattedData;
}
