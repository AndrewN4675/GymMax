import { neon } from '@neondatabase/serverless'; // used for database querying 
import { error } from 'console';
import { createHash } from 'crypto';
import { redirect } from 'next/navigation'

const sql = neon(`${process.env.DATABASE_URL}`);


export async function CreateMember(phone: string, DOB: string, email: string, username: string, password: string, firstName: string, lastName: string ) {
    email = email.toLowerCase(); // convert to match database storing system
    username = username.toLowerCase(); // convert to match database storing system
    const hashedPass = createHash('sha256').update(password).digest('hex'); 
    try {

        const result = await sql`
        SELECT * FROM Member
        WHERE email = ${email}
        OR username = ${username};`;
        
        if(result.length > 0) { //account is already made with that email and or password
            throw error;
        }

        await sql('INSERT INTO member (phone, dob, email, username, user_password, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [phone, DOB, email, username, hashedPass, firstName, lastName]
        );
        return {success: true};
    } catch(error){
        console.error('Login failed', error);
        throw new Error('User authentication failed');
    }
}
