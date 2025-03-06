import { neon } from '@neondatabase/serverless'; // used for database querying 
import crypto from 'crypto' // used for password encryption
import { redirect } from 'next/navigation'

const sql = neon(`${process.env.DATABASE_URL}`);

export async function Authenticate(email: string, password: string) {
    email = email.toLocaleUpperCase(); // convert to match database storing system
    const encrypted_password = crypto.createHash('sha256').update(password).digest('hex');

    try {
        const result = await sql('SELECT encrypted_pass FROM Member WHERE email = ${email}');
        if(result.length === 0) {
            alert('No user found in database');
            redirect('/register');
        }

        if(encrypted_password !== result[0].password) { // password did not match users email
            throw new Error('Invalid login credentials');
        }

        alert('User found in database');

        return {success: true};
    } catch(error){
        console.error('Login failed', error);
        throw new Error('User authentication failed');
    }
}
