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
    <div className="min-h-screen bg-gray-50">
      {isDemo && <DemoBanner />}

      <div className="max-w-7xl mx-auto px-6 py-8 lg:flex lg:gap-8" style={isDemo ? { paddingTop: '4rem' } : undefined}>
        {/* Sidebar — hidden on mobile */}
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <nav className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-gray-500" />
              Mes apps
            </Link>
            <Link
              href="/dashboard/create"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Cr&eacute;er une app
            </Link>
            {!isDemo && (
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-500" />
                Mon compte
              </Link>
            )}

            {/* User section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center gap-3 px-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
                  {displayInitial}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate flex-1 min-w-0">
                  {isDemo ? 'Mode démo' : displayEmail}
                </p>
              </div>
              {isDemo ? (
                <Link
                  href="/signup"
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Cr&eacute;er un compte
                </Link>
              ) : (
                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    D&eacute;connexion
                  </button>
                </form>
              )}
            </div>
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-50"
            >
              <LayoutDashboard className="w-4 h-4 text-gray-500" />
              Mes apps
            </Link>
            <Link
              href="/dashboard/create"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-700"
            >
              <Sparkles className="w-4 h-4" />
              Cr&eacute;er
            </Link>
            {!isDemo && (
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                Compte
              </Link>
            )}
            {isDemo ? (
              <Link
                href="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100"
              >
                S&apos;inscrire
              </Link>
            ) : (
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Quitter
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
