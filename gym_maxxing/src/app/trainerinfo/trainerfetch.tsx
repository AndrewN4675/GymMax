'use client';

import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.NEXT_PUBLIC_DATABASE_URL}`);

export async function FetchTrainers() {
    try {
        const trainers = await sql`SELECT * FROM Trainer`;
        return trainers.map((trainer: any) => ({
            TrainerID: trainer.trainerid,
            FirstName: trainer.firstname,
            LastName: trainer.lastname,
            PhoneNumber: trainer.phonenumber,
            Expertise: trainer.expertise,
            Email: trainer.email,
          }));
    } catch (error) {
        console.error("Failed to fetch trainers:", error);
        return [];
    }
}