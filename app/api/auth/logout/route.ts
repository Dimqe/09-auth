import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios, { isAxiosError } from 'axios';


const EXTERNAL_API_URL = 'https://notehub-api.goit.study/auth/logout';

export async function POST() {
  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');

    
    if (token) {
      await axios.post(EXTERNAL_API_URL, null, { 
        headers: {
          Cookie: `accessToken=${token.value}`,
        },
      });
    }

   
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    
    response.cookies.set('accessToken', '', { path: '/', maxAge: -1 });
    response.cookies.set('refreshToken', '', { path: '/', maxAge: -1 });

    return response;

  } catch (error) {
 
    const response = NextResponse.json(
        { message: 'Logout failed but cookies cleared' },
        { status: isAxiosError(error) ? error.response?.status || 500 : 500 }
      );
    response.cookies.set('accessToken', '', { path: '/', maxAge: -1 });
    response.cookies.set('refreshToken', '', { path: '/', maxAge: -1 });
    return response;
  }
}

