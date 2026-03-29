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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-[var(--primary)]">Happlier</span>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
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
