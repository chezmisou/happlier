'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Trash2, CreditCard, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { daysRemaining, formatDate } from '@/lib/utils';
import type { App } from '@/types';

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const statusVariant = {
    active: 'success' as const,
    trial: 'warning' as const,
    expired: 'destructive' as const,
  };

  const statusLabel = {
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
    <Card variant="bordered" className="hover:shadow-lg hover:shadow-black/5 hover:border-[var(--primary)]/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{app.name}</CardTitle>
            <CardDescription className="mt-1.5">
              <Link
                href={`/${app.slug}`}
                target="_blank"
                className="text-[var(--primary)] hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                happlier.com/{app.slug}
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </CardDescription>
          </div>
          <Badge variant={statusVariant[app.status]}>
            {statusLabel[app.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-2 leading-relaxed">
          {app.description}
        </p>

        {/* Color preview */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-5 h-5 rounded-md border border-[var(--border)]"
            style={{ backgroundColor: app.color_primary }}
          />
          <div
            className="w-5 h-5 rounded-md border border-[var(--border)]"
            style={{ backgroundColor: app.color_secondary }}
          />
          <span className="text-xs text-[var(--muted-foreground)] ml-1">
            Palette
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] pb-4 border-b border-[var(--border)]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Créée le {formatDate(app.created_at)}
          </span>
          {app.status === 'trial' && days !== null && (
            <span
              className={`font-semibold ${
                days <= 1
                  ? 'text-[var(--destructive)]'
                  : 'text-amber-600'
              }`}
            >
              {days} jour{days !== 1 ? 's' : ''} restant
              {days !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Link href={`/${app.slug}`} target="_blank" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Voir
            </Button>
          </Link>
          {app.status === 'trial' && (
            <Button size="sm" onClick={handleSubscribe} className="flex-1">
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
            className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
