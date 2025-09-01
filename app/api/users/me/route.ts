import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import axios, { isAxiosError } from 'axios';

const EXTERNAL_API_URL = 'https://notehub-api.goit.study/users/me';


export async function GET() {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('accessToken');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    
    const res = await axios.get(EXTERNAL_API_URL, {
      headers: {
        Cookie: `accessToken=${token.value}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: 'Failed to fetch user' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('accessToken');
    const body = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }


    const res = await axios.patch(EXTERNAL_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${token.value}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: 'Failed to update user' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
