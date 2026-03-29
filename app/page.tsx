'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Examples } from '@/components/landing/examples';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { Menu, X } from 'lucide-react';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <span className="text-lg sm:text-xl font-extrabold gradient-text">
              Happlier
            </span>
            <div className="hidden lg:flex items-center gap-6">
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
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Connexion
              </Link>
              <Link href="/signup">
                <Button size="sm">Commencer</Button>
              </Link>
              <button
                className="lg:hidden p-1.5 text-[var(--muted-foreground)]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-[var(--card)]">
            <div className="px-4 py-3 space-y-2">
              <a
                href="#how-it-works"
                className="block py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                Fonctionnement
              </a>
              <a
                href="#pricing"
                className="block py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                Tarifs
              </a>
              <a
                href="#faq"
                className="block py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </a>
            </div>
          </div>
        )}
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
