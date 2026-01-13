// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const AUTH_PAGES = ['/login', '/register'];
const PROTECTED_PAGES = ['/dashboard', '/checkout', '/profile'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // const hasRefreshToken = req.cookies.has('refresh_token');
  const access_token = req.cookies.get('access_token')?.value;

  // 🔒 Logged-in users should NOT access login/register
  if (access_token && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 🔑 Logged-out users should NOT access protected pages
  if (!access_token && PROTECTED_PAGES.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
