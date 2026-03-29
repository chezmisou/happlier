import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Sparkles, Layers } from 'lucide-react';
import { AppCard } from '@/components/dashboard/app-card';
import { Button } from '@/components/ui/button';
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {isDemo ? 'Dashboard démo' : 'Mes applications'}
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-xs sm:text-sm">
            {isDemo ? (
              'Explorez le dashboard — créez une app pour tester'
            ) : (
              <>
                <span className="font-semibold text-[var(--foreground)]">
                  {userApps.length}
                </span>{' '}
                / 2 applications créées
              </>
            )}
          </p>
        </div>
        {canCreate ? (
          <Link href="/dashboard/create">
            <Button size="sm" className="sm:hidden">
              <Plus className="w-4 h-4 mr-1.5" />
              Créer
            </Button>
            <Button className="hidden sm:inline-flex">
              <Plus className="w-4 h-4 mr-2" />
              Créer une app
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            title="Vous avez atteint la limite de 2 applications"
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer une app
          </Button>
        )}
      </div>

      {/* Usage bar (not in demo) */}
      {!isDemo && (
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            <span className="font-medium">Utilisation</span>
            <span className="text-[var(--muted-foreground)]">
              {userApps.length}/2 apps
            </span>
          </div>
          <div className="h-1.5 sm:h-2 rounded-full bg-[var(--muted)] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all duration-500"
              style={{ width: `${(userApps.length / 2) * 100}%` }}
            />
          </div>
        </div>
      )}

      {userApps.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[var(--accent)] rounded-2xl flex items-center justify-center">
            <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {isDemo ? 'Bienvenue dans la démo' : 'Aucune application'}
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] mb-6 sm:mb-8 max-w-md mx-auto px-4">
            {isDemo
              ? 'Testez la création d\'une app en quelques minutes grâce à l\'IA. L\'app générée ne sera pas sauvegardée.'
              : 'Créez votre première application en quelques minutes grâce à l\'IA. Décrivez votre idée et laissez la magie opérer.'}
          </p>
          <Link href="/dashboard/create">
            <Button size="lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isDemo ? 'Tester la création' : 'Créer ma première app'}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {userApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
