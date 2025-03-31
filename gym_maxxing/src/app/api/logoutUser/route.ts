import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  console.log("Logging out user");

  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('sessionToken', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // expire cookie right away
  });

  return response;
}
