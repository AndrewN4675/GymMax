'use server'

import { neon } from '@neondatabase/serverless';
import { put, del } from '@vercel/blob';
import { Trainer } from '../lib/types';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function FetchTrainers(gymId: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const defaultProfile = 'https://ea9ukfncuamxkqnm.public.blob.vercel-storage.com/default_pfp-ZHTINW6O4yDsoMAOhtjrDAtVuiAuCa.png';

    const result = await sql`
        SELECT * FROM Trainer
        WHERE gym_id = ${parseInt(gymId)}
        ORDER BY trainerid ASC;`;

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

export async function UpdateTrainerInfo(trainers: Trainer[]) {
    try {
      // Loop through each trainer and execute an update query for each
      for (const trainer of trainers) {

        await sql`
          UPDATE Trainer
          SET 
            firstname = ${trainer.firstName},
            lastname = ${trainer.lastName},
            phoneNumber = ${trainer.phone},
            email = ${trainer.email},
            expertise = ${trainer.expertise},
            bio = ${trainer.bio},
            picture_url = ${trainer.pictureUrl}
          WHERE trainerid = ${trainer.trainerId};`;
      }
      return { success: true };
    } catch (error) {
      console.error('Error updating trainers:', error);
      throw new Error('Failed to update trainers');
    }
}

export async function UploadImage(trainerId: number, image: File) {
    let blobUrl = null;
    try {
        // upload the new image to our non-relational database (Vercel Blob)
        blobUrl = await put(image.name, image, {
        access: 'public',
        addRandomSuffix: true,
        });

        blobUrl = blobUrl.url;

        // delete the existing file from the database
        const currentUrl = await sql`
            SELECT picture_url FROM Trainer 
            WHERE trainerid = ${trainerId};`;

        if(currentUrl.length > 0) {
          // ensure they have a url, if they do we need to delete it
          if(currentUrl[0].picture_url !== null) {
            await del(currentUrl[0].picture_url);
          }    
        }
        
        // link it to our relational database (Neon)
        await sql`
            UPDATE Trainer 
            SET picture_url = ${blobUrl}
            WHERE trainerid = ${trainerId};`;
      
        return { success: true };
    } catch (error) {
      console.error('Failed to upload or update the trainers image', error);
      return { success: false };
    }
}