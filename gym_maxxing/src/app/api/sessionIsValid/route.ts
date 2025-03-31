import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("Checking if session exists and if it is valid");

  const sessionToken = req.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    console.log("session NOT valid");
    return NextResponse.json({ sessionValid: false }, { status: 401 });
  }

  console.log("session IS valid");
  return NextResponse.json({ sessionValid: true, userId: sessionToken });
}
