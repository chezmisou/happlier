'use client';

import * as React from 'react';
import { Loader2, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { Place } from '@/types/place';
import { ManualPlaceDialog, type ManualPrefill } from './manual-place-dialog';
import { withBasePath } from '@/lib/base-path';

type Props = {
  onCreated: (place: Place) => void;
};

export function AddLinkForm({ onCreated }: Props) {
  const [url, setUrl] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [manualPrefill, setManualPrefill] = React.useState<ManualPrefill | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(withBasePath('/api/places'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (res.status === 422) {
        toast.warning(data.error ?? 'Could not extract automatically');
        setManualPrefill({
          ...(data.partial ?? {}),
          sourceUrl: data.partial?.sourceUrl ?? url,
        });
        return;
      }
      if (!res.ok) {
        toast.error(data.error ?? 'Something went wrong');
        return;
      }
      if (data.duplicate) toast.info(`Already saved: ${data.place.name}`);
      else toast.success(`Added ${data.place.name}`);
      onCreated(data.place);
      setUrl('');
    } catch (err) {
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} className="flex w-full gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Paste a TikTok, Instagram or Google Maps link…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={submitting}
            className="pl-9"
          />
        </div>
        <Button type="submit" disabled={submitting || !url.trim()}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
        </Button>
        <Button type="button" variant="outline" onClick={() => setManualPrefill({})}>
          Manual
        </Button>
      </form>

      <ManualPlaceDialog
        open={manualPrefill !== null}
        onOpenChange={(o) => !o && setManualPrefill(null)}
        prefill={manualPrefill ?? {}}
        onCreated={(p) => {
          setManualPrefill(null);
          onCreated(p);
        }}
      />
    </>
  );
}
