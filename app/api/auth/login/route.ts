// import { NextRequest, NextResponse } from 'next/server';
// import { api } from '@/lib/api/api';
// import { cookies } from 'next/headers';
// import { parse } from 'cookie';
// import { isAxiosError } from 'axios';
// import { logErrorResponse } from "@lib/_utils/utils";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const apiRes = await api.post('auth/login', body);

//     const cookieStore = await cookies();
//     const setCookie = apiRes.headers['set-cookie'];

//     if (setCookie) {
//       const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
//       for (const cookieStr of cookieArray) {
//         const parsed = parse(cookieStr);
//         const options = {
//           expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
//           path: parsed.Path,
//           maxAge: Number(parsed['Max-Age']),
//         };
//         if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
//         if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
//       }

//       return NextResponse.json(apiRes.data, { status: apiRes.status });
//     }

//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.status }
//       );
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import axios, { isAxiosError } from 'axios';
import { parse } from 'cookie';


const EXTERNAL_API_URL = 'https://notehub-api.goit.study/auth/login';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

   
    const apiRes = await axios.post(EXTERNAL_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

   
    const response = NextResponse.json(apiRes.data, { status: 200 });

    const setCookie = apiRes.headers['set-cookie'];

   
    if (setCookie) {
      for (const cookieStr of setCookie) {
        const [name, value] = cookieStr.split(';')[0].split('=');
        const parsed = parse(cookieStr);

        response.cookies.set({
          name: name,
          value: value,
          httpOnly: true,
          path: parsed.Path || '/',
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });
      }
    }

    return response;

  } catch (error) {
    if (isAxiosError(error)) {
     
      return NextResponse.json(
        error.response?.data || { message: 'An error occurred' },
        { status: error.response?.status || 500 }
      );
    }
    
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
