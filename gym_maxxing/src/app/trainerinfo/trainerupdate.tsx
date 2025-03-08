import { neon } from '@neondatabase/serverless'; // used for database querying 
import { redirect } from 'next/navigation'

const sql = neon(`${process.env.NEXT_PUBLIC_DATABASE_URL}`);

export async function updateTrainerInfo(trainers: any) {
    try {
      // Loop through each trainer and execute an update query for each
      for (const trainer of trainers) {
        const { TrainerID, FirstName, LastName, PhoneNumber, Expertise, Email } = trainer;
  
        // Use parameterized queries properly
        await sql(`
          UPDATE Trainer
          SET 
            FirstName = $1,
            LastName = $2,
            PhoneNumber = $3,
            Expertise = $4,
            Email = $5
          WHERE TrainerID = $6
        `, [FirstName, LastName, PhoneNumber, Expertise, Email, TrainerID]);
  
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error updating trainers:', error);
      throw new Error('Failed to update trainers');
    }
  }