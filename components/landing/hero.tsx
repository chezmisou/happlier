import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-[var(--secondary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-semibold mb-8 shadow-sm">
          <Zap className="w-4 h-4" />
          Propulsé par l&apos;IA Claude
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up stagger-1 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          Créez votre app web
          <br />
          <span className="gradient-text">en quelques minutes</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-2 text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Décrivez votre idée, personnalisez le design, et notre IA génère
          votre application web complète. Accessible en ligne instantanément.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-base px-8 animate-pulse-glow">
              <Sparkles className="w-5 h-5 mr-2" />
              Créer mon app gratuitement
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg" className="text-base px-8">
              Comment ça marche
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up stagger-4 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                'bg-indigo-500',
                'bg-purple-500',
                'bg-pink-500',
                'bg-cyan-500',
              ].map((bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-[var(--background)] flex items-center justify-center text-white text-xs font-bold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="font-medium">+200 apps créées</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-[var(--border)]" />
          <span>Gratuit pendant 3 jours, puis 5€/mois par app</span>
        </div>

        {/* Preview mockup */}
        <div className="animate-fade-in-up stagger-5 mt-16 relative">
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/10 overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-md mx-auto h-6 rounded-md bg-[var(--background)] border border-[var(--border)] flex items-center px-3 text-xs text-[var(--muted-foreground)]">
                  happlier.com/mon-app
                </div>
              </div>
            </div>
            {/* Content preview */}
            <div className="p-8 sm:p-12">
              <div className="grid sm:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="h-4 w-24 rounded-full bg-[var(--primary)]/20" />
                  <div className="h-8 w-full rounded-lg bg-[var(--muted)]" />
                  <div className="h-8 w-3/4 rounded-lg bg-[var(--muted)]" />
                  <div className="space-y-2 mt-4">
                    <div className="h-3 w-full rounded bg-[var(--muted)]" />
                    <div className="h-3 w-5/6 rounded bg-[var(--muted)]" />
                    <div className="h-3 w-4/6 rounded bg-[var(--muted)]" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <div className="h-10 w-32 rounded-xl bg-[var(--primary)]" />
                    <div className="h-10 w-32 rounded-xl border-2 border-[var(--border)]" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-[var(--border)]" />
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect under mockup */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[var(--primary)]/10 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
