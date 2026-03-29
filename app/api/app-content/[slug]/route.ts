import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface AppContent {
  generated_code: string | null;
  status: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const supabase = createAdminClient();

  const { data } = await supabase
    .from('apps')
    .select('generated_code, status')
    .eq('slug', slug)
    .maybeSingle();

  const app = data as AppContent | null;

  if (!app) {
    return new NextResponse('<!DOCTYPE html><html><body><h1>404 - App introuvable</h1></body></html>', {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  if (app.status === 'expired') {
    return new NextResponse(
      '<!DOCTYPE html><html><body><h1>Cette application n\'est plus disponible</h1><p>La période d\'essai a expiré.</p></body></html>',
      {
        status: 410,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
  }

  if (!app.generated_code) {
    return new NextResponse('<!DOCTYPE html><html><body><h1>App en cours de génération</h1></body></html>', {
      status: 202,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new NextResponse(app.generated_code, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' fonts.googleapis.com fonts.gstatic.com; script-src 'unsafe-inline'; style-src 'unsafe-inline' fonts.googleapis.com",
    },
  });
}
