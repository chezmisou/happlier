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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isDemo ? 'Dashboard démo' : 'Mes applications'}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {isDemo ? (
              'Explorez le dashboard — créez une app pour tester'
            ) : (
              <>
                <span className="font-semibold text-gray-900">
                  {userApps.length}
                </span>{' '}
                / 2 applications créées
              </>
            )}
          </p>
        </div>
        {canCreate ? (
          <Button className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
            <Link href="/dashboard/create">
              <Plus className="w-4 h-4 mr-2" />
              Créer une app
            </Link>
          </Button>
        ) : (
          <Button disabled className="bg-violet-600 text-white opacity-50">
            <Plus className="w-4 h-4 mr-2" />
            Créer une app
          </Button>
        )}
      </div>

      {/* Usage bar */}
      {!isDemo && (
        <div className="mb-8 p-4 rounded-2xl bg-white border border-gray-200">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-gray-900">Utilisation</span>
            <span className="text-gray-500">{userApps.length}/2 apps</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-500"
              style={{ width: `${(userApps.length / 2) * 100}%` }}
            />
          </div>
        </div>
      )}

      {userApps.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-violet-50 rounded-2xl flex items-center justify-center">
            <Layers className="w-10 h-10 text-violet-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isDemo ? 'Bienvenue dans la démo' : 'Aucune application'}
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {isDemo
              ? 'Testez la création d\'une app en quelques minutes grâce à l\'IA.'
              : 'Créez votre première application en quelques minutes grâce à l\'IA.'}
          </p>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
            <Link href="/dashboard/create">
              <Sparkles className="w-5 h-5 mr-2" />
              {isDemo ? 'Tester la création' : 'Créer ma première app'}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {userApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
