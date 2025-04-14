"use server"
import { neon } from '@neondatabase/serverless'; // used for database querying 
import { redirect } from 'next/navigation'

console.log("URL: " + `${process.env.DATABASE_URL}`);
const sql = neon(`${process.env.DATABASE_URL}`);

export async function updateTrainerInfo(trainers: any) {
    try {
      // Loop through each trainer and execute an update query for each
      for (const trainer of trainers) {

        await sql`
          UPDATE Trainer
          SET 
            firstname = ${trainer.FirstName},
            lastname = ${trainer.LastName},
            phoneNumber = ${trainer.PhoneNumber},
            email = ${trainer.Email},
            expertise = ${trainer.Expertise}
            bio = ${trainer.Bio}
            picture_url = ${trainer.PictureUrl}
          WHERE trainerid = ${trainer.TrainerID}
        `;
        const { TrainerID, FirstName, LastName, PhoneNumber, Expertise, Email } = trainer;
  
        /*
        // Use parameterized queries properly
        await sql(`
          UPDATE Trainer
          SET 
            firstname = $1,
            LastName = $2,
            PhoneNumber = $3,
            Expertise = $4,
            Email = $5
          WHERE TrainerID = $6
        `, [FirstName, LastName, PhoneNumber, Expertise, Email, TrainerID]);
        */
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error updating trainers:', error);
      throw new Error('Failed to update trainers');
    }
  }