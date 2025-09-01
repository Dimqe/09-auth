import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import axios, { isAxiosError } from 'axios';

const EXTERNAL_API_URL = 'https://notehub-api.goit.study/notes';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    let apiUrl = EXTERNAL_API_URL;
    if (tag && tag.toLowerCase() !== 'all') {
      apiUrl += `?tag=${tag}`;
    }
    
  
    const res = await axios.get(apiUrl, {
      headers: {
        Cookie: `accessToken=${token.value}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: 'Failed to fetch notes' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');
    const body = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    
    const res = await axios.post(EXTERNAL_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${token.value}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: 'Failed to create note' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

