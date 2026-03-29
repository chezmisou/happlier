import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isReservedSlug } from '@/lib/utils';
import { checkSlugSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const parsed = checkSlugSchema.safeParse({ slug });
  if (!parsed.success) {
    return NextResponse.json({ available: false, error: 'Slug invalide' }, { status: 400 });
  }

  if (isReservedSlug(parsed.data.slug)) {
    return NextResponse.json({ available: false });
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from('apps')
    .select('id')
    .eq('slug', parsed.data.slug)
    .maybeSingle();

  return NextResponse.json({ available: !data });
}
