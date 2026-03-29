import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/utils/get-base-url';

export async function POST() {
  const response = NextResponse.redirect(new URL('/dashboard', getBaseUrl()));

  response.cookies.set('demo_mode', 'true', {
    path: '/',
    maxAge: 60 * 60, // 1 hour
    httpOnly: false,
    sameSite: 'lax',
  });

  return response;
}
