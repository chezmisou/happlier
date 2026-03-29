import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { LayoutDashboard, Settings, LogOut, Sparkles } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-[var(--border)] bg-[var(--card)] px-4 py-6">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="text-xl font-extrabold gradient-text px-3 mb-8"
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
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Settings className="w-5 h-5 text-[var(--muted-foreground)]" />
              Paramètres
            </Link>
          </nav>

          {/* User section */}
          <div className="border-t border-[var(--border)] pt-4 mt-4">
            <div className="flex items-center gap-3 px-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--destructive)] transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden">
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]">
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
                className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white"
              >
                <Sparkles className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
