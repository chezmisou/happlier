import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '',
    description: 'Idéal pour tester et découvrir',
    features: [
      'Jusqu\'à 2 applications',
      '3 jours d\'essai par app',
      'Personnalisation complète',
      'URL en happlier.com/votre-app',
      'Support par email',
    ],
    cta: 'Commencer gratuitement',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Par App',
    price: '5€',
    period: '/mois',
    description: 'Pour garder vos apps en ligne',
    features: [
      'Tout du plan gratuit',
      'App en ligne illimitée',
      'Pas d\'expiration',
      'Notifications SMS',
      'Support prioritaire',
    ],
    cta: 'Commencer l\'essai gratuit',
    href: '/signup',
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-[var(--muted)]/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[var(--primary)] mb-3 tracking-wide uppercase">
            Tarification
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
            Commencez gratuitement, payez uniquement pour garder vos apps en
            ligne
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-2xl shadow-indigo-500/25 scale-[1.02]'
                  : 'bg-[var(--card)] border-2 border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-400 text-amber-950 text-xs font-bold rounded-full shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  Populaire
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted
                    ? 'text-white/80'
                    : 'text-[var(--muted-foreground)]'
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-lg ${
                      plan.highlighted
                        ? 'text-white/70'
                        : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
                {plan.period && (
                  <span
                    className={`block text-sm mt-1 ${
                      plan.highlighted
                        ? 'text-white/60'
                        : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    par application
                  </span>
                )}
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlighted
                          ? 'bg-white/20'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? 'secondary' : 'primary'}
                  size="lg"
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-white text-[var(--primary)] hover:bg-white/90 shadow-lg'
                      : ''
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
