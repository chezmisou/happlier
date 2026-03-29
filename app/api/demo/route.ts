import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));

  response.cookies.set('demo_mode', 'true', {
    path: '/',
    maxAge: 60 * 60, // 1 hour
    httpOnly: false,
    sameSite: 'lax',
  });

  return response;
}
