import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    // Define URL patterns
    //const isAdminPage = pathname.startsWith('/admin');
    const isAdminPage = pathname.startsWith('/trainerinfo');
    
    const isProtectedPage = pathname.startsWith('/dashboard') || pathname.startsWith('/profile');
    const isPublicPage = !isAdminPage && !isProtectedPage;

    if (!isAdminPage) {
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
    }

    // if it's an admin page, check if the user is an admin and redirt if not
    if (isAdminPage) {
      // Check if user is an admin. Currently commented out because Admin capability is not supported yet
      const res = await fetch('https://gymmax.vercel.app/api/adminCheck', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });

      const adminData = await res.json(); 

      if (adminData.isAdmin == false) {
          console.log("Not admin");
          return NextResponse.redirect(new URL('/', req.nextUrl));
      }
    }
    

    console.log("Session valid");
    return NextResponse.next();
}

export const config = {
  matcher: ['/trainerinfo', '/manage_classes'],  // apply the middleware to these guys
};
