import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-violet-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page introuvable</h2>
        <p className="text-gray-500 mb-6">
          La page que vous recherchez n&apos;existe pas ou a &eacute;t&eacute; supprim&eacute;e.
        </p>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
          <Link href="/">Retour &agrave; l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
}
