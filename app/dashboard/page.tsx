import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { App } from '@/types';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get('demo_mode')?.value === 'true';

  let userApps: App[] = [];

  if (!isDemo) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: apps } = await supabase
        .from('apps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      userApps = (apps || []) as App[];
    }
  }

  const canCreate = userApps.length < 2;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
            {isDemo ? 'Dashboard démo' : 'Mes applications'}
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            {isDemo
              ? 'Explorez le dashboard — créez une app pour tester'
              : `${userApps.length} / 2 applications créées`
            }
          </p>
        </div>
        {canCreate && (
          <Link
            href="/dashboard/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: '#7c3aed',
              color: '#fff',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Créer une app
          </Link>
        )}
      </div>

      {/* Usage bar */}
      {!isDemo && (
        <div style={{ marginBottom: '32px', padding: '20px', borderRadius: '14px', background: '#fff', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Utilisation</span>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>{userApps.length}/2 apps</span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: '#f3f4f6', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', width: `${(userApps.length / 2) * 100}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
      )}

      {/* Empty state */}
      {userApps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 24px', background: '#f5f3ff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
            {isDemo ? 'Bienvenue dans la démo' : 'Aucune application'}
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '32px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            {isDemo
              ? "Testez la création d'une app en quelques minutes grâce à l'IA."
              : "Créez votre première application en quelques minutes grâce à l'IA."}
          </p>
          <Link
            href="/dashboard/create"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#7c3aed',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            {isDemo ? 'Tester la création' : 'Créer ma première app'}
          </Link>
        </div>
      ) : (
        /* App cards grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {userApps.map((app) => (
            <div
              key={app.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#fff',
                border: '1px solid #e5e7eb',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div
                style={{
                  height: '120px',
                  background: `linear-gradient(135deg, ${app.color_primary || '#7c3aed'}, ${app.color_secondary || '#6d28d9'})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}
              >
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '18px', textAlign: 'center' }}>{app.name}</span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: 0 }}>{app.name}</h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '100px',
                      background: app.status === 'active' ? '#d1fae5' : app.status === 'trial' ? '#fef3c7' : '#fee2e2',
                      color: app.status === 'active' ? '#065f46' : app.status === 'trial' ? '#92400e' : '#991b1b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {app.status === 'active' ? 'Actif' : app.status === 'trial' ? 'Essai' : 'Expiré'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>{app.category}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    href={`/${app.slug}`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#7c3aed',
                      background: '#f5f3ff',
                      textDecoration: 'none',
                    }}
                  >
                    Voir l&apos;app
                  </Link>
                  <Link
                    href={`/dashboard/apps/${app.id}/data`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#374151',
                      border: '1px solid #e5e7eb',
                      textDecoration: 'none',
                    }}
                  >
                    Données
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
