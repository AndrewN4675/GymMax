import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest) {
  console.log("Checking if admin");

  const sessionToken = req.cookies.get('sessionToken')?.value;

  const sql = neon(`${process.env.DATABASE_URL}`);
    
  const result = await sql`
  SELECT admin_id 
  FROM admin
  WHERE member_id = ${sessionToken};`;

  if (result.length === 0) {
    console.log("user NOT admin");
    return NextResponse.json({ isAdmin: false });
  }

  console.log("user IS admin");
  return NextResponse.json({ isAdmin: true });
}
