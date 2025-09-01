import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import axios, { isAxiosError } from 'axios';


const EXTERNAL_API_URL = 'https://notehub-api.goit.study/auth/session';

export async function GET() {
  try {
  
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');

    
    let cookieString = '';
    if (accessToken) cookieString += `accessToken=${accessToken.value};`;
    if (refreshToken) cookieString += ` refreshToken=${refreshToken.value};`;

    
    const apiRes = await axios.get(EXTERNAL_API_URL, {
      headers: {
        Cookie: cookieString,
      },
    });

   
    const response = NextResponse.json(apiRes.data, { status: 200 });

    
    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
     
      for (const cookieStr of setCookie) {
        const [name, value] = cookieStr.split(';')[0].split('=');
        response.headers.append('Set-Cookie', cookieStr);
      }
    }

    return response;
    
  } catch (error) {
    
    if (isAxiosError(error)) {
      return NextResponse.json(null, { status: 200 });
    }
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

