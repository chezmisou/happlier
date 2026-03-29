import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Examples } from '@/components/landing/examples';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-extrabold gradient-text">
              Happlier
            </span>
            <div className="hidden sm:flex items-center gap-6">
              <a
                href="#how-it-works"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium"
              >
                Fonctionnement
              </a>
              <a
                href="#pricing"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium"
              >
                Tarifs
              </a>
              <a
                href="#faq"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors font-medium"
              >
                FAQ
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Connexion
              </Link>
              <Link href="/signup">
                <Button size="sm">Commencer</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <HowItWorks />
        <Examples />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
