'use client';

import * as React from 'react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Place } from '@/types/place';
import { PLACE_TYPE_COLORS } from '@/lib/place-display';
import { useTheme } from 'next-themes';

const PARIS = { lat: 48.8566, lng: 2.3522 };

type Props = {
  places: Place[];
  activeId: string | null;
  onMarkerClick: (id: string) => void;
};

export function MapView({ places, activeId, onMarkerClick }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return (
      <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
        Set <code className="mx-1 rounded bg-background px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
        to load the map.
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <InnerMap places={places} activeId={activeId} onMarkerClick={onMarkerClick} />
    </APIProvider>
  );
}

function InnerMap({ places, activeId, onMarkerClick }: Props) {
  const { resolvedTheme } = useTheme();
  const initialCenter = React.useMemo(() => {
    if (places.length === 0) return PARIS;
    return { lat: places[0].latitude, lng: places[0].longitude };
  }, [places]);

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || undefined;

  return (
    <Map
      mapId={mapId}
      defaultCenter={initialCenter}
      defaultZoom={places.length === 0 ? 11 : 13}
      gestureHandling="greedy"
      disableDefaultUI={false}
      colorScheme={resolvedTheme === 'dark' ? 'DARK' : 'LIGHT'}
      className="h-full w-full"
    >
      <Markers places={places} activeId={activeId} onMarkerClick={onMarkerClick} />
      <FitBounds places={places} activeId={activeId} />
    </Map>
  );
}

function Markers({ places, activeId, onMarkerClick }: Props) {
  const map = useMap();
  const clustererRef = React.useRef<MarkerClusterer | null>(null);
  const markersRef = React.useRef<globalThis.Map<string, google.maps.marker.AdvancedMarkerElement>>(
    new globalThis.Map(),
  );

  React.useEffect(() => {
    if (!map) return;
    if (!clustererRef.current) clustererRef.current = new MarkerClusterer({ map });
    return () => {
      clustererRef.current?.clearMarkers();
      clustererRef.current = null;
    };
  }, [map]);

  React.useEffect(() => {
    const clusterer = clustererRef.current;
    if (!clusterer) return;
    clusterer.clearMarkers();
    const markers = Array.from(markersRef.current.values());
    clusterer.addMarkers(markers);
  }, [places, activeId]);

  return (
    <>
      {places.map((p) => (
        <AdvancedMarker
          key={p.id}
          position={{ lat: p.latitude, lng: p.longitude }}
          onClick={() => onMarkerClick(p.id)}
          ref={(el) => {
            if (el) markersRef.current.set(p.id, el);
            else markersRef.current.delete(p.id);
          }}
        >
          <Pin color={PLACE_TYPE_COLORS[p.placeType]} active={activeId === p.id} />
        </AdvancedMarker>
      ))}
    </>
  );
}

function FitBounds({ places, activeId }: { places: Place[]; activeId: string | null }) {
  const map = useMap();
  const fittedRef = React.useRef(false);

  React.useEffect(() => {
    if (!map || places.length === 0 || fittedRef.current) return;
    const bounds = new google.maps.LatLngBounds();
    places.forEach((p) => bounds.extend({ lat: p.latitude, lng: p.longitude }));
    map.fitBounds(bounds, 64);
    fittedRef.current = true;
  }, [map, places]);

  React.useEffect(() => {
    if (!map || !activeId) return;
    const place = places.find((p) => p.id === activeId);
    if (!place) return;
    map.panTo({ lat: place.latitude, lng: place.longitude });
    if ((map.getZoom() ?? 0) < 14) map.setZoom(15);
  }, [map, activeId, places]);

  return null;
}

function Pin({ color, active }: { color: string; active: boolean }) {
  return (
    <div
      className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-md transition-transform"
      style={{
        backgroundColor: color,
        transform: active ? 'scale(1.4)' : 'scale(1)',
      }}
    >
      <div className="h-2 w-2 rounded-full bg-white" />
    </div>
  );
}
