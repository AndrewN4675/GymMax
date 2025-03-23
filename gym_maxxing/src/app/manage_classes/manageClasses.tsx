'use server'

import { neon } from '@neondatabase/serverless'; // used for database querying 
import { ClassInfo, Trainer } from '@/app/lib/types';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function FetchClasses() {
    // join tables on the foreign key so we can get the trainer name as 'last, first'
    const result = await sql`
    SELECT fc.*, CONCAT(t.lastname, ', ', t.firstname) trainer_name
    FROM FitnessClass fc
    JOIN Trainer t ON fc.trainer_id = t.trainerid
    ORDER BY fc.class_date;`;  

    if(result.length === 0) {
        return [];
    }
    
    // reformat queried data into our FitnessClassInfo datatype for easier use
    const formattedData: ClassInfo[] = result.map(row => ({
        classID: row.class_id, 
        title: row.title,
        date: new Date(row.class_date).toLocaleDateString('en-US', { // format date into 'Month,DD,YYYY'
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        time: row.start_time,
        trainerID: row.trainer_id,
        trainerName: row.trainer_name,
        classSize: row.class_size
    }));

    return formattedData;
}

export async function FetchTrainers() {
    const result = await sql`
    SELECT trainerid, CONCAT(lastname, ', ', firstname) trainer_name
    FROM Trainer;`;  
    if(result.length === 0) {
        return [];
    }
    const formattedData: Trainer[] = result.map(row => ({
        trainerID: row.trainerid,
        trainerName: row.trainer_name
    }));
    return formattedData;
}

export async function AddClass(cls: ClassInfo) {
    try {
        const result = await sql('INSERT INTO FitnessClass (title, class_date, start_time, trainer_id, class_size) VALUES ($1, $2, $3, $4, $5) RETURNING 1;',
            [cls.title, cls.date, cls.time, cls.trainerID, cls.classSize]);

        return { success: true };
    } catch (error) {
        console.error('Error adding a class:', error);
    }
}

export async function RemoveClass(classID: number) {
    const result = await sql`
    DELETE FROM FitnessClass WHERE class_id = ${classID};`;
}
