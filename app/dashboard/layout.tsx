import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { DemoBanner } from '@/components/dashboard/demo-banner';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get('demo_mode')?.value === 'true';

  let user = null;

  if (!isDemo) {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      redirect('/auth/login');
    }
    user = authUser;
  }

  const displayEmail = user?.email || 'demo@happlier.com';
  const displayInitial = displayEmail[0].toUpperCase();

  const navItems = [
    { href: '/dashboard', label: 'Mes apps', icon: 'grid' },
    { href: '/dashboard/create', label: 'Créer une app', icon: 'plus', accent: true },
    ...(!isDemo ? [{ href: '/dashboard/settings', label: 'Mon compte', icon: 'settings' }] : []),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>
      {isDemo && <DemoBanner />}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isDemo ? '80px 24px 40px' : '32px 24px 40px', display: 'flex', gap: '32px' }}>

        {/* Sidebar desktop */}
        <aside className="dashboard-sidebar" style={{ width: '240px', flexShrink: 0, display: 'none' }}>
          <nav style={{ position: 'sticky', top: '32px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: item.accent ? 600 : 500,
                  textDecoration: 'none',
                  color: item.accent ? '#7c3aed' : '#374151',
                  background: item.accent ? '#f5f3ff' : 'transparent',
                  transition: 'background 0.15s',
                }}
              >
                {item.icon === 'grid' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                )}
                {item.icon === 'plus' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                )}
                {item.icon === 'settings' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                )}
                {item.label}
              </Link>
            ))}

            {/* Separator */}
            <div style={{ height: '1px', background: '#e5e7eb', margin: '12px 0' }} />

            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>
                {displayInitial}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                {isDemo ? 'Mode démo' : displayEmail}
              </span>
            </div>

            {isDemo ? (
              <Link href="/auth/signup" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#7c3aed', textDecoration: 'none', background: '#f5f3ff' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
                Créer un compte
              </Link>
            ) : (
              <form action="/api/auth/signout" method="POST">
                <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                  Déconnexion
                </button>
              </form>
            )}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="dashboard-mobile-nav" style={{ display: 'none', marginBottom: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: item.accent ? '#fff' : '#374151',
                  background: item.accent ? '#7c3aed' : '#fff',
                  border: item.accent ? 'none' : '1px solid #e5e7eb',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Link>
            ))}
            {isDemo ? (
              <Link href="/auth/signup" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: '#7c3aed', background: '#f5f3ff', textDecoration: 'none', whiteSpace: 'nowrap' }}>S&apos;inscrire</Link>
            ) : (
              <form action="/api/auth/signout" method="POST">
                <button type="submit" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, color: '#6b7280', background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Déconnexion</button>
              </form>
            )}
          </div>
        </div>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) { .dashboard-sidebar { display: block !important; } .dashboard-mobile-nav { display: none !important; } }
        @media (max-width: 1023px) { .dashboard-sidebar { display: none !important; } .dashboard-mobile-nav { display: block !important; } }
      `}</style>
    </div>
  );
}
