'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ExternalLink, Trash2, CreditCard, Clock, Database } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { daysRemaining, formatDate } from '@/lib/utils';
import type { App } from '@/types';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const statusLabel: Record<string, string> = {
    active: 'Active',
    trial: 'Essai',
    expired: 'Expirée',
  };

  const days = daysRemaining(app.expires_at);

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette application ?'))
      return;
    setDeleting(true);

    const supabase = createClient();
    await supabase.from('apps').delete().eq('id', app.id);
    router.refresh();
  };

  const handleSubscribe = async () => {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId: app.id }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-violet-200 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900">{app.name}</h3>
            <Link
              href={`/${app.slug}`}
              target="_blank"
              className="text-violet-600 hover:underline inline-flex items-center gap-1.5 text-sm font-medium mt-1"
            >
              happlier.com/{app.slug}
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={
              app.status === 'active'
                ? { background: '#d1fae5', color: '#047857' }
                : app.status === 'trial'
                  ? { background: '#fef3c7', color: '#b45309' }
                  : { background: '#fee2e2', color: '#b91c1c' }
            }
          >
            {statusLabel[app.status]}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {app.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-5 h-5 rounded-md border border-gray-200"
            style={{ backgroundColor: app.color_primary }}
          />
          <div
            className="w-5 h-5 rounded-md border border-gray-200"
            style={{ backgroundColor: app.color_secondary }}
          />
          <span className="text-xs text-gray-400 ml-1">Palette</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pb-4 border-b border-gray-200">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Créée le {formatDate(app.created_at)}
          </span>
          {app.status === 'trial' && days !== null && (
            <span
              className="font-semibold"
              style={{ color: days <= 1 ? '#dc2626' : '#d97706' }}
            >
              {days}j restant{days !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Link href={`/${app.slug}`} target="_blank" className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-sm">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Voir
            </Button>
          </Link>
          <Link href={`/dashboard/apps/${app.id}/data`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-sm">
              <Database className="w-3.5 h-3.5 mr-1.5" />
              Données
            </Button>
          </Link>
          {app.status === 'trial' && (
            <Button size="sm" onClick={handleSubscribe} className="flex-1 text-sm bg-violet-600 hover:bg-violet-700 text-white">
              <CreditCard className="w-3.5 h-3.5 mr-1.5" />
              Souscrire
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            loading={deleting}
            aria-label="Supprimer"
            className="text-gray-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
