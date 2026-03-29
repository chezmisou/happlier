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
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Donn&eacute;es re&ccedil;ues
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {appName ? `${appName} — ` : ''}{rows.length} entr&eacute;e{rows.length !== 1 ? 's' : ''}
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
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              !selectedCollection
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-violet-50'
            }`}
          >
            Toutes
          </button>
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                selectedCollection === col
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-violet-50'
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
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 bg-violet-50 rounded-2xl flex items-center justify-center">
            <Database className="w-10 h-10 text-violet-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucune donn&eacute;e</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Les donn&eacute;es soumises via les formulaires de votre app appara&icirc;tront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {allCollections.map((collection) => {
            const collectionRows = rows.filter((r) => r.collection === collection);
            if (collectionRows.length === 0) return null;

            const dataKeys = [
              ...new Set(collectionRows.flatMap((r) => Object.keys(r.data))),
            ];

            return (
              <div key={collection}>
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-violet-600" />
                  {collection}
                  <span className="text-sm font-normal text-gray-500">
                    ({collectionRows.length})
                  </span>
                </h2>
                <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left px-4 py-2.5 font-semibold text-gray-500">
                            Date
                          </th>
                          {dataKeys.map((key) => (
                            <th
                              key={key}
                              className="text-left px-4 py-2.5 font-semibold text-gray-500"
                            >
                              {key}
                            </th>
                          ))}
                          <th className="px-4 py-2.5 w-10" />
                        </tr>
                      </thead>
                      <tbody>
                        {collectionRows.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-gray-200 last:border-0 hover:bg-gray-50"
                          >
                            <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                              {formatDate(row.created_at)}
                            </td>
                            {dataKeys.map((key) => (
                              <td key={key} className="px-4 py-2.5 text-gray-900 max-w-[200px] truncate">
                                {String(row.data[key] ?? '')}
                              </td>
                            ))}
                            <td className="px-4 py-2.5">
                              <button
                                onClick={() => handleDelete(row.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
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
