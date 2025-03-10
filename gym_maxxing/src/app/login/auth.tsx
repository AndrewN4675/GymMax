import { neon } from '@neondatabase/serverless'; // used for database querying 

export async function Authenticate(email: string, password: string) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    email = email.toLowerCase(); // convert user input email to match database storing system
    
    const result = await sql` 
    SELECT user_password 
    FROM Member 
    WHERE email = ${email};`;
    
    if(result.length === 0) {
        return {success: false, redirect: '/register'}
    }
    else if(password !== result[0].user_password) { // password did not match users email
        return {success: false}
    }
    console.log('Login successful');
    return {success: true, redirect: '/dashboard'};
}
