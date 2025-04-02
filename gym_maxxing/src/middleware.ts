import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    // Check if user has a session
    const sessionRes = await fetch('https://gymmax.vercel.app/api/sessionIsValid', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Cookie': req.headers.get('cookie') || '',
      },
    });

    const sessionData = await sessionRes.json(); 

    if (sessionData.sessionValid === false) {
        console.log("No session, return");
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Check if user is an admin. Currently commented out because Admin capability is not supported yet
    /*const res = await fetch('https://gymmax.vercel.app/api/adminCheck', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    });

    const adminData = await res.json(); 

    if (adminData.isAdmin == false) {
        console.log("Not admin");
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }*/

    console.log("Session valid");
    return NextResponse.next();
}

export const config = {
  matcher: ['/trainerinfo', '/manage_classes'],  // apply the middleware to these pages
};
