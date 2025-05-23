import { neon } from '@neondatabase/serverless'; // used for database querying 
import { createHash } from 'crypto';

export async function Authenticate(id: string, password: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    id = id.toLowerCase(); // convert user input email to match database storing system
    const hashedPass = createHash('sha256').update(password).digest('hex'); 

    const result = await sql` 
    SELECT member_id, username, user_password
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
    const username = result[0].username;
    const userId =  result[0].member_id;

    return {success: true, redirect: '/', username: result[0].username, member_id: result[0].member_id};
}
