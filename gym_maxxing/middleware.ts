import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = await fetch('https://gymmax.vercel.app/api/sessionIsValid', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    });

    if (res.status === 401) {
        console.log("Middleware: Session not valid, redirecting to login");
        return NextResponse.redirect('https://gymmax.vercel.app/login');
    }

    console.log("Middleware: Session valid, allowing request");
    return NextResponse.next();
}

export const config = {
  matcher: ['/trainerinfo', '/manage_classes', '/homepage'],  // apply the middleware to these pages
};
