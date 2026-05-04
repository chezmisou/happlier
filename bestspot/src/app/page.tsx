'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { AddLinkForm } from '@/components/add-link-form';
import { Sidebar } from '@/components/sidebar';
import { PlaceDetail } from '@/components/place-detail';
import { ThemeToggle } from '@/components/theme-toggle';
import type { Place } from '@/types/place';
import type { PlaceType, SourceType } from '@/lib/types';
import { withBasePath } from '@/lib/base-path';

const MapView = dynamic(() => import('@/components/map-view').then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-muted" />,
});

type SortKey = 'createdAt' | 'name' | 'rating';

export default function BestspotPage() {
  const [places, setPlaces] = React.useState<Place[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [filters, setFilters] = React.useState<{
    search: string;
    type: PlaceType | 'all';
    source: SourceType | 'all';
    sort: SortKey;
  }>({ search: '', type: 'all', source: 'all', sort: 'createdAt' });

  React.useEffect(() => {
    void refresh();
  }, []);

  async function refresh() {
    const res = await fetch(withBasePath('/api/places'));
    if (!res.ok) return;
    const data = await res.json();
    setPlaces(data.places);
  }

  const visiblePlaces = React.useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    let list = places.filter((p) => {
      if (filters.type !== 'all' && p.placeType !== filters.type) return false;
      if (filters.source !== 'all' && p.sourceType !== filters.source) return false;
      if (search) {
        const hay = `${p.name} ${p.formattedAddress ?? ''}`.toLowerCase();
        if (!hay.includes(search)) return false;
      }
      return true;
    });
    list = list.slice().sort((a, b) => {
      switch (filters.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating ?? -1) - (a.rating ?? -1);
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    return list;
  }, [places, filters]);

  const activePlace = activeId ? places.find((p) => p.id === activeId) ?? null : null;

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="z-30 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">bestspot</span>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <AddLinkForm
            onCreated={(p) => {
              setPlaces((prev) => {
                const without = prev.filter((x) => x.id !== p.id);
                return [p, ...without];
              });
              setActiveId(p.id);
            }}
          />
        </div>
        <ThemeToggle />
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar
          places={visiblePlaces}
          activeId={activeId}
          onSelect={setActiveId}
          onDelete={(id) => {
            setPlaces((prev) => prev.filter((p) => p.id !== id));
            if (activeId === id) setActiveId(null);
          }}
          filters={filters}
          setFilters={setFilters}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
        />

        <main className="relative flex-1">
          <MapView places={visiblePlaces} activeId={activeId} onMarkerClick={setActiveId} />
          {activePlace && (
            <PlaceDetail
              place={activePlace}
              onClose={() => setActiveId(null)}
              onDelete={(id) => {
                setPlaces((prev) => prev.filter((p) => p.id !== id));
                setActiveId(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
