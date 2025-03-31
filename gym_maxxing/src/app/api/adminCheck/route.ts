import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  console.log("Checking if session exists and if it is valid");

  const username = req.cookies.get('username')?.value;

  const sql = neon(`${process.env.DATABASE_URL}`);
    
  const result = await sql`
  SELECT username 
  FROM Admin
  WHERE username = ${username};`;

  if (result.length === 0) {
    console.log("user NOT admin");
    return NextResponse.json({ isAdmin: false });
  }

  console.log("user IS admin");
  return NextResponse.json({ isAdmin: true });
}
