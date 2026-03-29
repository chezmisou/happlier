'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Database, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface AppDataRow {
  id: string;
  app_id: string;
  collection: string;
  data: Record<string, unknown>;
  created_at: string;
}

export default function AppDataPage() {
  const params = useParams();
  const appId = params.id as string;
  const [rows, setRows] = useState<AppDataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [appName, setAppName] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = selectedCollection
        ? `/api/app-data?app_id=${appId}&collection=${encodeURIComponent(selectedCollection)}`
        : `/api/app-data?app_id=${appId}`;
      const res = await fetch(url);
      const json = await res.json();
      setRows(json.data || []);
    } catch {
      setRows([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function loadApp() {
      const supabase = createClient();
      const { data } = await supabase
        .from('apps')
        .select('name')
        .eq('id', appId)
        .maybeSingle();
      if (data) setAppName((data as { name: string }).name);
    }
    loadApp();
  }, [appId]);

  useEffect(() => {
    fetchData();
  }, [appId, selectedCollection]);

  const collections = [...new Set(rows.map((r) => r.collection))];

  const allCollections = selectedCollection
    ? [selectedCollection]
    : [...new Set(rows.map((r) => r.collection))];

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette entrée ?')) return;
    const supabase = createClient();
    await supabase.from('app_data').delete().eq('id', id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Données reçues
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-xs sm:text-sm lg:text-base">
            {appName ? `${appName} — ` : ''}{rows.length} entrée{rows.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData}>
          <RefreshCw className="w-4 h-4 mr-1.5" />
          Actualiser
        </Button>
      </div>

      {/* Collection filter */}
      {collections.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCollection(null)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              !selectedCollection
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
            }`}
          >
            Toutes
          </button>
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCollection === col
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-[var(--muted)] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[var(--accent)] rounded-2xl flex items-center justify-center">
            <Database className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Aucune donnée</h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-md mx-auto">
            Les données soumises via les formulaires de votre app apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {allCollections.map((collection) => {
            const collectionRows = rows.filter((r) => r.collection === collection);
            if (collectionRows.length === 0) return null;

            // Get all keys from data objects
            const dataKeys = [
              ...new Set(collectionRows.flatMap((r) => Object.keys(r.data))),
            ];

            return (
              <div key={collection}>
                <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary)]" />
                  {collection}
                  <span className="text-xs sm:text-sm font-normal text-[var(--muted-foreground)]">
                    ({collectionRows.length})
                  </span>
                </h2>
                <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--card)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                          <th className="text-left px-3 sm:px-4 py-2.5 font-semibold text-[var(--muted-foreground)]">
                            Date
                          </th>
                          {dataKeys.map((key) => (
                            <th
                              key={key}
                              className="text-left px-3 sm:px-4 py-2.5 font-semibold text-[var(--muted-foreground)]"
                            >
                              {key}
                            </th>
                          ))}
                          <th className="px-3 sm:px-4 py-2.5 w-10" />
                        </tr>
                      </thead>
                      <tbody>
                        {collectionRows.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50"
                          >
                            <td className="px-3 sm:px-4 py-2.5 text-[var(--muted-foreground)] whitespace-nowrap">
                              {formatDate(row.created_at)}
                            </td>
                            {dataKeys.map((key) => (
                              <td key={key} className="px-3 sm:px-4 py-2.5 max-w-[200px] truncate">
                                {String(row.data[key] ?? '')}
                              </td>
                            ))}
                            <td className="px-3 sm:px-4 py-2.5">
                              <button
                                onClick={() => handleDelete(row.id)}
                                className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
