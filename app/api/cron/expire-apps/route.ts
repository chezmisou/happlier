import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendSMS } from '@/lib/twilio';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  // 1. Expire trial apps past their expiration date
  const { data: expiredApps } = await supabase
    .from('apps')
    .select('id, name, user_id, logo_url')
    .eq('status', 'trial')
    .lt('expires_at', now);

  if (expiredApps && expiredApps.length > 0) {
    for (const app of expiredApps) {
      // Update status
      await supabase
        .from('apps')
        .update({ status: 'expired', generated_code: null })
        .eq('id', app.id);

      // Delete logo from storage if exists
      if (app.logo_url) {
        const path = app.logo_url.split('/app-assets/')[1];
        if (path) {
          await supabase.storage.from('app-assets').remove([path]);
        }
      }

      // Send SMS notification
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', app.user_id)
        .single();

      if (profile?.phone) {
        await sendSMS(
          profile.phone,
          `Votre app "${app.name}" sur Happlier a expiré. Souscrivez sur happlier.com pour la maintenir en ligne.`
        );
      }
    }
  }

  // 2. Send reminder for apps expiring in the next 24 hours
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data: expiringApps } = await supabase
    .from('apps')
    .select('id, name, user_id')
    .eq('status', 'trial')
    .gt('expires_at', now)
    .lt('expires_at', tomorrow);

  if (expiringApps && expiringApps.length > 0) {
    for (const app of expiringApps) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', app.user_id)
        .single();

      if (profile?.phone) {
        await sendSMS(
          profile.phone,
          `Votre app "${app.name}" expire demain. Souscrivez à 5€/mois pour la garder en ligne : happlier.com/dashboard`
        );
      }
    }
  }

  return NextResponse.json({
    expired: expiredApps?.length || 0,
    reminded: expiringApps?.length || 0,
  });
}
