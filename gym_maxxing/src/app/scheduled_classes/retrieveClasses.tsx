'use server';

import { neon } from '@neondatabase/serverless';
import { ClassInfo } from './interfaces';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function RetrieveClasses(gymId?: number): Promise<ClassInfo[]> {

  let query = `
    SELECT 
      fc.class_id, 
      fc.title,
      fc.class_date,
      fc.start_time,
      fc.class_size,
      fc.gym_id,
      CONCAT(t.lastname, ', ', t.firstname) AS trainer_name
    FROM fitnessclass fc
    JOIN trainer t ON fc.trainer_id = t.trainerid
  `;

  if (gymId) {
    query += ` WHERE fc.gym_id = ${gymId}`;
  }

  query += ` ORDER BY fc.class_date;`;

  const result = await sql(query);

  if (!result || result.length === 0) {
    return [];
  }

  const formattedData: ClassInfo[] = result.map((row: any) => ({
    classID: row.class_id,
    title: row.title,
    date: new Date(row.class_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    time: row.start_time,
    trainerName: row.trainer_name,
    classSize: row.class_size,
    gymID: row.gym_id,
  }));

  return formattedData;
}
