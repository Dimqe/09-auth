import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_PREFIXES = ['/profile', '/notes'];
const PUBLIC_PREFIXES = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  

  const token = req.cookies.get('accessToken');

  if (PRIVATE_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

 
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (token) {
      const profileUrl = new URL('/profile', req.url);
      return NextResponse.redirect(profileUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
