import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { LayoutDashboard, Settings, LogOut, Sparkles } from 'lucide-react';
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
      redirect('/login');
    }
    user = authUser;
  }

  const displayEmail = user?.email || 'demo@happlier.com';
  const displayInitial = displayEmail[0].toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Demo banner */}
      {isDemo && <DemoBanner />}

      {/* Sidebar for desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col" style={isDemo ? { top: '2.5rem' } : undefined}>
        <div className="flex flex-col flex-grow border-r border-[var(--border)] bg-[var(--card)] px-4 py-6">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="text-lg sm:text-xl font-extrabold gradient-text px-3 mb-6 sm:mb-8"
          >
            Happlier
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-[var(--muted-foreground)]" />
              Mes applications
            </Link>
            <Link
              href="/dashboard/create"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--primary)] bg-[var(--accent)] hover:bg-[var(--accent)]/80 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Créer une app
            </Link>
            {!isDemo && (
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              >
                <Settings className="w-5 h-5 text-[var(--muted-foreground)]" />
                Paramètres
              </Link>
            )}
          </nav>

          {/* User section */}
          <div className="border-t border-[var(--border)] pt-4 mt-4">
            <div className="flex items-center gap-3 px-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">
                {displayInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {isDemo ? 'Mode démo' : displayEmail}
                </p>
              </div>
            </div>
            {isDemo ? (
              <Link
                href="/signup"
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--primary)] hover:bg-[var(--accent)] transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Créer un compte
              </Link>
            ) : (
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--destructive)] transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden" style={isDemo ? { marginTop: '2.5rem' } : undefined}>
        <nav className="fixed left-0 right-0 z-40 glass border-b border-[var(--border)]" style={isDemo ? { top: '2.5rem' } : { top: 0 }}>
          <div className="flex items-center justify-between h-14 px-4">
            <Link
              href="/dashboard"
              className="text-lg font-extrabold gradient-text"
            >
              Happlier
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/create"
                className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white"
              >
                <Sparkles className="w-4 h-4" />
              </Link>
              {isDemo ? (
                <Link
                  href="/signup"
                  className="text-sm font-semibold text-[var(--primary)]"
                >
                  S&apos;inscrire
                </Link>
              ) : (
                <>
                  <Link
                    href="/dashboard/settings"
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <main className="lg:pl-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
