import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-[var(--primary)] mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page introuvable</h2>
        <p className="text-[var(--muted-foreground)] mb-6">
          La page que vous recherchez n&apos;existe pas ou a été supprimée.
        </p>
        <Link href="/">
          <Button>Retour à l&apos;accueil</Button>
        </Link>
      </div>
    </div>
  );
}
