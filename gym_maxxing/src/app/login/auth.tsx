import { neon } from '@neondatabase/serverless'; // used for database querying 
import { createHash } from 'crypto';

export async function Authenticate(id: string, password: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    id = id.toLowerCase(); // convert user input email to match database storing system
    const hashedPass = createHash('sha256').update(password).digest('hex'); 

    const result = await sql` 
    SELECT user_password 
    FROM Member 
    WHERE email = ${id}
    OR username = ${id};`;
    
    if(result.length === 0) {
        return {success: false, redirect: '/register'}
    }
    else if(hashedPass !== result[0].user_password) { // password did not match users email
        return {success: false}
    }
    console.log('Login successful');

    // Create a session (through HTTP cookies)
    const username = await sql` 
    SELECT username 
    FROM Member 
    WHERE email = ${id}
    OR username = ${id};`;

    const userId = await sql` 
    SELECT user_id 
    FROM Member 
    WHERE email = ${id}
    OR username = ${id};`;

    // call the createSession API route to create a session
    const sessionResponse = await fetch('/api/createSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, username })
    });

    if (!sessionResponse.ok) {
      return { success: false, error: 'Failed to create session' };
    }

    return {success: true, redirect: '/homepage'};
}
