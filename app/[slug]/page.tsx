import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Metadata } from 'next';

interface SlugPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const supabase = createAdminClient();
  const { data: app } = await supabase
    .from('apps')
    .select('name, description')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!app) {
    return { title: 'App introuvable — Happlier' };
  }

  const { name, description } = app as { name: string; description: string };

  return {
    title: name,
    description,
    robots: { index: false, follow: false },
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const supabase = createAdminClient();
  const { data: app } = await supabase
    .from('apps')
    .select('id, name, status, generated_code')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!app) {
    notFound();
  }

  const { name, status, generated_code } = app as {
    id: string;
    name: string;
    status: string;
    generated_code: string | null;
  };

  if (status === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Application expir&eacute;e</h1>
          <p className="text-gray-500">
            Cette application n&apos;est plus disponible. La p&eacute;riode d&apos;essai a expir&eacute;.
          </p>
        </div>
      </div>
    );
  }

  if (!generated_code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <p className="text-gray-500">Application en cours de g&eacute;n&eacute;ration...</p>
      </div>
    );
  }

  return (
    <iframe
      src={`/api/app-content/${params.slug}`}
      className="w-full h-screen border-0"
      sandbox="allow-scripts allow-same-origin"
      title={name}
    />
  );
}
