import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Propulsé par l&apos;IA Claude
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Créez votre app web en{' '}
          <span className="text-[var(--primary)]">quelques minutes</span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10">
          Décrivez ce que vous voulez, personnalisez les couleurs et le logo, et
          notre IA génère votre application web complète. Accessible en ligne
          instantanément.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-base px-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Créer mon app gratuitement
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="text-base px-8">
              Comment ça marche
            </Button>
          </a>
        </div>
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Gratuit pendant 3 jours, puis 5€/mois par app
        </p>
      </div>
    </section>
  );
}
