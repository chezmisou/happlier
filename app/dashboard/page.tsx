import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AppCard } from '@/components/dashboard/app-card';
import { Button } from '@/components/ui/button';
import type { App } from '@/types';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: apps } = await supabase
    .from('apps')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false });

  const userApps = (apps || []) as App[];
  const canCreate = userApps.length < 2;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mes applications</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            {userApps.length}/2 applications créées
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
          <Button disabled title="Vous avez atteint la limite de 2 applications">
            <Plus className="w-4 h-4 mr-2" />
            Créer une app
          </Button>
        )}
      </div>

      {userApps.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--muted)] rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-[var(--muted-foreground)]" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucune application</h2>
          <p className="text-[var(--muted-foreground)] mb-6">
            Créez votre première application en quelques minutes grâce à l&apos;IA
          </p>
          <Link href="/dashboard/create">
            <Button>Créer ma première app</Button>
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
