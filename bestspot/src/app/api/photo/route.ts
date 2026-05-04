import { NextRequest, NextResponse } from 'next/server';
import { placePhotoMediaUrl } from '@/lib/google-places';

// Proxies a Google Places photo media URL so the API key stays server-side.
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name');
  if (!name || !name.startsWith('places/')) {
    return NextResponse.json({ error: 'Missing or invalid photo name' }, { status: 400 });
  }
  const max = parseInt(req.nextUrl.searchParams.get('w') ?? '800', 10) || 800;

  const upstream = await fetch(placePhotoMediaUrl(name, Math.min(Math.max(max, 64), 1600)), {
    redirect: 'follow',
  });
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Photo fetch failed' }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
