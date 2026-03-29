import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { app_id, collection, data } = body;

    if (!app_id || !collection || !data) {
      return NextResponse.json(
        { error: 'app_id, collection et data sont requis' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Verify that the app exists
    const { data: app, error: appError } = await adminClient
      .from('apps')
      .select('id')
      .eq('id', app_id)
      .maybeSingle();

    if (appError || !app) {
      return NextResponse.json(
        { error: 'Application introuvable' },
        { status: 404 }
      );
    }

    const { data: inserted, error: insertError } = await adminClient
      .from('app_data')
      .insert({
        app_id,
        collection,
        data,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: inserted.id });
  } catch {
    return NextResponse.json(
      { error: 'Requête invalide' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const appId = searchParams.get('app_id');
    const collection = searchParams.get('collection');

    if (!appId) {
      return NextResponse.json(
        { error: 'app_id est requis' },
        { status: 400 }
      );
    }

    // Verify ownership
    const { data: app } = await supabase
      .from('apps')
      .select('id')
      .eq('id', appId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!app) {
      return NextResponse.json(
        { error: 'Application introuvable ou non autorisée' },
        { status: 404 }
      );
    }

    let query = supabase
      .from('app_data')
      .select('*')
      .eq('app_id', appId)
      .order('created_at', { ascending: false });

    if (collection) {
      query = query.eq('collection', collection);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Erreur lors de la récupération' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
