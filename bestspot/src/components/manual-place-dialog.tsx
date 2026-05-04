'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PLACE_TYPES, SOURCE_TYPES, type PlaceType, type SourceType } from '@/lib/types';
import { PLACE_TYPE_LABELS, SOURCE_LABELS } from '@/lib/place-display';
import { toast } from 'sonner';
import type { Place } from '@/types/place';
import { withBasePath } from '@/lib/base-path';

export type ManualPrefill = {
  name?: string;
  formattedAddress?: string | null;
  latitude?: number;
  longitude?: number;
  placeType?: PlaceType;
  sourceType?: SourceType;
  sourceUrl?: string;
  reviewExcerpt?: string | null;
  notes?: string | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill: ManualPrefill;
  onCreated: (place: Place) => void;
};

export function ManualPlaceDialog({ open, onOpenChange, prefill, onCreated }: Props) {
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState<ManualPrefill>(prefill);

  React.useEffect(() => {
    setForm(prefill);
  }, [prefill, open]);

  function set<K extends keyof ManualPrefill>(key: K, value: ManualPrefill[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || form.latitude === undefined || form.longitude === undefined) {
      toast.error('Name and coordinates are required');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(withBasePath('/api/places/manual'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          formattedAddress: form.formattedAddress ?? null,
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
          placeType: form.placeType ?? 'other',
          sourceType: form.sourceType ?? 'manual',
          sourceUrl: form.sourceUrl ?? '',
          reviewExcerpt: form.reviewExcerpt ?? null,
          notes: form.notes ?? null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? 'Could not save');
        return;
      }
      toast.success(`Added ${data.place.name}`);
      onCreated(data.place);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add place manually</DialogTitle>
          <DialogDescription>
            Fill in what you can. Coordinates are required so the marker shows up.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name ?? ''}
              onChange={(e) => set('name', e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.formattedAddress ?? ''}
              onChange={(e) => set('formattedAddress', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                value={form.latitude ?? ''}
                onChange={(e) => set('latitude', e.target.value === '' ? undefined : Number(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                value={form.longitude ?? ''}
                onChange={(e) => set('longitude', e.target.value === '' ? undefined : Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select
                value={form.placeType ?? 'other'}
                onValueChange={(v) => set('placeType', v as PlaceType)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PLACE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{PLACE_TYPE_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Source</Label>
              <Select
                value={form.sourceType ?? 'manual'}
                onValueChange={(v) => set('sourceType', v as SourceType)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SOURCE_TYPES.map((s) => (
                    <SelectItem key={s} value={s}>{SOURCE_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sourceUrl">Source URL</Label>
            <Input
              id="sourceUrl"
              type="url"
              value={form.sourceUrl ?? ''}
              onChange={(e) => set('sourceUrl', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">Review excerpt</Label>
            <Input
              id="excerpt"
              value={form.reviewExcerpt ?? ''}
              maxLength={280}
              onChange={(e) => set('reviewExcerpt', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={form.notes ?? ''}
              onChange={(e) => set('notes', e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
