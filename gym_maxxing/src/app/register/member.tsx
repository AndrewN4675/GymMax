import { neon } from '@neondatabase/serverless'; // used for database querying 
import crypto from 'crypto' // used for password encryption
import { redirect } from 'next/navigation'

const sql = neon(`${process.env.DATABASE_URL}`);


export async function CreateMember(phone: string, DOB: string, email: string, username: string, password: string, firstName: string, lastName: string ) {
    email = email.toLocaleUpperCase(); // convert to match database storing system

    try {
        const result = await sql('INSERT INTO member (phone, dob, email, username, user_password, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [phone, DOB, email, username, password, firstName, lastName]
        );
        if(result.length === 0) {
            alert('No user found in database');
            redirect('/register');
        }

        return {success: true};
    } catch(error){
        console.error('Login failed', error);
        throw new Error('User authentication failed');
    }
}
