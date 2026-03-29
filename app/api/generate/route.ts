import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateApp } from '@/lib/claude';
import { createAppSchema } from '@/lib/validations';
import { isReservedSlug } from '@/lib/utils';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isDemo = cookieStore.get('demo_mode')?.value === 'true';

    let user = null;

    if (!isDemo) {
      const supabase = await createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
      }
      user = authUser;

      // Check app limit
      const { count } = await supabase
        .from('apps')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (count !== null && count >= 2) {
        return NextResponse.json(
          { error: 'Vous avez atteint la limite de 2 applications' },
          { status: 403 }
        );
      }
    }

    const formData = await request.formData();
    const body = {
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      category: (formData.get('category') as string) || undefined,
      color_primary: formData.get('color_primary') as string,
      color_secondary: formData.get('color_secondary') as string,
    };

    const parsed = createAppSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    if (isReservedSlug(parsed.data.slug)) {
      return NextResponse.json({ error: 'Ce slug est réservé' }, { status: 400 });
    }

    // In demo mode, just generate the code without saving
    if (isDemo) {
      const generatedCode = await generateApp({
        name: parsed.data.name,
        description: parsed.data.description,
        category: parsed.data.category || null,
        colorPrimary: parsed.data.color_primary,
        colorSecondary: parsed.data.color_secondary,
        logoUrl: null,
      });

      return NextResponse.json({ code: generatedCode });
    }

    // Non-demo flow: check slug, upload logo, save to DB
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from('apps')
      .select('id')
      .eq('slug', parsed.data.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Ce slug est déjà pris' }, { status: 409 });
    }

    // Upload logo if provided
    let logoUrl: string | null = null;
    const logoFile = formData.get('logo') as File | null;
    if (logoFile && logoFile.size > 0) {
      if (logoFile.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: 'Le logo ne doit pas dépasser 2 Mo' }, { status: 400 });
      }

      const adminClient = createAdminClient();
      const ext = logoFile.name.split('.').pop();
      const path = `logos/${user!.id}/${parsed.data.slug}.${ext}`;
      const buffer = Buffer.from(await logoFile.arrayBuffer());

      const { error: uploadError } = await adminClient.storage
        .from('app-assets')
        .upload(path, buffer, {
          contentType: logoFile.type,
          upsert: true,
        });

      if (!uploadError) {
        const { data: urlData } = adminClient.storage
          .from('app-assets')
          .getPublicUrl(path);
        logoUrl = urlData.publicUrl;
      }
    }

    // Generate app with Claude
    const generatedCode = await generateApp({
      name: parsed.data.name,
      description: parsed.data.description,
      category: parsed.data.category || null,
      colorPrimary: parsed.data.color_primary,
      colorSecondary: parsed.data.color_secondary,
      logoUrl,
    });

    // Save to database
    const { error: insertError } = await supabase.from('apps').insert({
      user_id: user!.id,
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description,
      category: parsed.data.category || null,
      color_primary: parsed.data.color_primary,
      color_secondary: parsed.data.color_secondary,
      logo_url: logoUrl,
      generated_code: generatedCode,
    });

    if (insertError) {
      return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 });
    }

    return NextResponse.json({ code: generatedCode });
  } catch (err) {
    console.error('Generate error:', err);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de l\'application' },
      { status: 500 }
    );
  }
}
