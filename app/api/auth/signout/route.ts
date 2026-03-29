import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/utils/get-base-url';

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/auth/login', getBaseUrl()));
}
