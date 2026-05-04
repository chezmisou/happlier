'use client';

import * as React from 'react';
import { Search, Star, ExternalLink, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PLACE_TYPES, SOURCE_TYPES, type PlaceType, type SourceType } from '@/lib/types';
import { PLACE_TYPE_COLORS, PLACE_TYPE_LABELS, SOURCE_LABELS } from '@/lib/place-display';
import type { Place } from '@/types/place';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SortKey = 'createdAt' | 'name' | 'rating';

type Props = {
  places: Place[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  filters: {
    search: string;
    type: PlaceType | 'all';
    source: SourceType | 'all';
    sort: SortKey;
  };
  setFilters: React.Dispatch<React.SetStateAction<Props['filters']>>;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

export function Sidebar({
  places,
  activeId,
  onSelect,
  onDelete,
  filters,
  setFilters,
  collapsed,
  onToggleCollapsed,
}: Props) {
  return (
    <aside
      className={cn(
        'relative z-20 flex h-full flex-col border-r bg-background transition-[width] duration-200',
        collapsed ? 'w-0 md:w-12' : 'w-full md:w-96',
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapsed}
        className="absolute -right-4 top-4 z-10 hidden h-8 w-8 rounded-full border bg-background shadow md:inline-flex"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {collapsed ? null : (
        <>
          <div className="space-y-2 border-b p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or address"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filters.type}
                onValueChange={(v) => setFilters((f) => ({ ...f, type: v as PlaceType | 'all' }))}
              >
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {PLACE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{PLACE_TYPE_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.source}
                onValueChange={(v) => setFilters((f) => ({ ...f, source: v as SourceType | 'all' }))}
              >
                <SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sources</SelectItem>
                  {SOURCE_TYPES.map((s) => (
                    <SelectItem key={s} value={s}>{SOURCE_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.sort}
                onValueChange={(v) => setFilters((f) => ({ ...f, sort: v as SortKey }))}
              >
                <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Newest</SelectItem>
                  <SelectItem value="name">Name A→Z</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {places.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="divide-y">
                {places.map((p) => (
                  <PlaceRow
                    key={p.id}
                    place={p}
                    active={activeId === p.id}
                    onSelect={() => onSelect(p.id)}
                    onDelete={async () => {
                      if (!confirm(`Delete "${p.name}"?`)) return;
                      const res = await fetch(`/api/places/${p.id}`, { method: 'DELETE' });
                      if (res.ok) {
                        toast.success(`Deleted ${p.name}`);
                        onDelete(p.id);
                      } else {
                        toast.error('Could not delete');
                      }
                    }}
                  />
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </aside>
  );
}

function PlaceRow({
  place,
  active,
  onSelect,
  onDelete,
}: {
  place: Place;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <li
      onClick={onSelect}
      className={cn(
        'group flex cursor-pointer items-start gap-3 p-3 transition-colors hover:bg-accent',
        active && 'bg-accent',
      )}
    >
      <span
        className="mt-1 h-3 w-3 shrink-0 rounded-full"
        style={{ backgroundColor: PLACE_TYPE_COLORS[place.placeType] }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{place.name}</p>
          {place.rating != null && (
            <span className="flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {place.rating.toFixed(1)}
            </span>
          )}
        </div>
        {place.formattedAddress && (
          <p className="truncate text-xs text-muted-foreground">{place.formattedAddress}</p>
        )}
        {place.reviewExcerpt && (
          <p className="mt-1 line-clamp-2 text-xs italic text-muted-foreground">
            “{place.reviewExcerpt}”
          </p>
        )}
        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{PLACE_TYPE_LABELS[place.placeType]}</span>
          <span>·</span>
          <span>{SOURCE_LABELS[place.sourceType]}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {place.googleMapsUrl && (
          <a
            href={place.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
            aria-label="Open in Google Maps"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded p-1 text-muted-foreground hover:bg-background hover:text-destructive"
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-sm text-muted-foreground">
      <p className="font-medium text-foreground">No places yet</p>
      <p>Paste a link above to add your first spot.</p>
      <p className="mt-2 text-xs">
        Try a Google Maps share link, a TikTok food video, or an Instagram reel.
      </p>
    </div>
  );
}
