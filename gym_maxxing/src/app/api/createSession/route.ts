import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log("inside login request function");

  try {
      const { userId, username } = await req.json(); //get user ID and username 

      // if there is no userId or username in the req, return an error
      if (!userId || !username) {
        return NextResponse.json({ error: 'Missing userId or username' }, { status: 400 });
      }

      // create a response and set cookie with user session
      const response = NextResponse.json({ message: 'Login successful', userId });

      response.cookies.set('sessionToken', userId, {
        httpOnly: false, //can be accessed by frontend
        secure: false,
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60, // expires after a day
      });
  
      response.cookies.set('username', username, {
        httpOnly: false, //can be accessed by frontend
        secure: false,
        sameSite: 'strict',
        path: '/',
        maxAge: 24 * 60 * 60, // expires after a day
      });

      console.log('Username: ', username, 'userID: ', userId, '\n');
  
      return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Could not login' }, { status: 500 });
  }
}
