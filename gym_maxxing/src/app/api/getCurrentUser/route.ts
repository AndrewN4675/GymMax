"use server"

import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  console.log("inside getCurrentUser");

  const sessionToken = req.cookies.get('sessionToken')?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: 'User not logged in' }, { status: 401 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const result = await sql`
    SELECT username 
    FROM Member
    WHERE member_id = ${sessionToken};`;

    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ username: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Could not retrieve user' }, { status: 500 });
  }
}
