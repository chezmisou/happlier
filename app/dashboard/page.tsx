import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Sparkles, Layers } from 'lucide-react';
import { AppCard } from '@/components/dashboard/app-card';
import { Button } from '@/components/ui/button';
import type { App } from '@/types';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: apps } = await supabase
    .from('apps')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false });

  const userApps = (apps || []) as App[];
  const canCreate = userApps.length < 2;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Mes applications
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm">
            <span className="font-semibold text-[var(--foreground)]">
              {userApps.length}
            </span>{' '}
            / 2 applications créées
          </p>
        </div>
        {canCreate ? (
          <Link href="/dashboard/create">
            <Button>
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

      {/* Usage bar */}
      <div className="mb-8 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Utilisation</span>
          <span className="text-[var(--muted-foreground)]">
            {userApps.length}/2 apps
          </span>
        </div>
        <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all duration-500"
            style={{ width: `${(userApps.length / 2) * 100}%` }}
          />
        </div>
      </div>

      {userApps.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-[var(--accent)] rounded-2xl flex items-center justify-center">
            <Layers className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Aucune application</h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
            Créez votre première application en quelques minutes grâce à
            l&apos;IA. Décrivez votre idée et laissez la magie opérer.
          </p>
          <Link href="/dashboard/create">
            <Button size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Créer ma première app
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {userApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
