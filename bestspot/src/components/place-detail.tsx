'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, ExternalLink, X, Trash2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Place } from '@/types/place';
import { PLACE_TYPE_COLORS, PLACE_TYPE_LABELS, SOURCE_LABELS } from '@/lib/place-display';
import { withBasePath } from '@/lib/base-path';
import { toast } from 'sonner';

type Props = {
  place: Place;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export function PlaceDetail({ place, onClose, onDelete }: Props) {
  return (
    <div className="pointer-events-auto absolute right-4 top-4 z-30 w-[min(360px,calc(100vw-2rem))] rounded-lg border bg-background shadow-xl">
      <div className="relative">
        {place.photoUrl ? (
          <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-muted">
            <Image
              src={place.photoUrl}
              alt={place.name}
              fill
              sizes="360px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div
            className="h-3 w-full rounded-t-lg"
            style={{ backgroundColor: PLACE_TYPE_COLORS[place.placeType] }}
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold leading-tight">{place.name}</h2>
            {place.rating != null && (
              <span className="flex shrink-0 items-center gap-0.5 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {place.rating.toFixed(1)}
                {place.userRatingsTotal != null && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({place.userRatingsTotal})
                  </span>
                )}
              </span>
            )}
          </div>
          {place.formattedAddress && (
            <p className="text-sm text-muted-foreground">{place.formattedAddress}</p>
          )}
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs">
            <span
              className="rounded-full px-2 py-0.5 text-white"
              style={{ backgroundColor: PLACE_TYPE_COLORS[place.placeType] }}
            >
              {PLACE_TYPE_LABELS[place.placeType]}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
              {SOURCE_LABELS[place.sourceType]}
            </span>
          </div>
        </div>

        {place.reviewExcerpt && (
          <p className="rounded-md border-l-2 border-muted-foreground/30 bg-muted/50 px-3 py-2 text-sm italic">
            “{place.reviewExcerpt}”
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {place.googleMapsUrl && (
            <Button asChild variant="outline" size="sm">
              <a href={place.googleMapsUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5" /> Maps
              </a>
            </Button>
          )}
          {place.websiteUrl && (
            <Button asChild variant="outline" size="sm">
              <a href={place.websiteUrl} target="_blank" rel="noreferrer">
                <Globe className="h-3.5 w-3.5" /> Website
              </a>
            </Button>
          )}
          {place.sourceUrl && (
            <Button asChild variant="outline" size="sm">
              <a href={place.sourceUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5" /> Source
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-destructive hover:text-destructive"
            onClick={async () => {
              if (!confirm(`Delete "${place.name}"?`)) return;
              const res = await fetch(withBasePath(`/api/places/${place.id}`), { method: 'DELETE' });
              if (res.ok) {
                toast.success(`Deleted ${place.name}`);
                onDelete(place.id);
              } else {
                toast.error('Could not delete');
              }
            }}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
