import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '',
    description: 'Idéal pour tester',
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
    <section id="pricing" className="py-20 px-4 bg-[var(--muted)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Tarifs simples et transparents
        </h2>
        <p className="text-center text-[var(--muted-foreground)] mb-16 max-w-2xl mx-auto">
          Commencez gratuitement, payez uniquement pour garder vos apps en ligne
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] ring-4 ring-[var(--primary)]/20'
                  : 'bg-[var(--background)] border border-[var(--border)]'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted ? 'opacity-80' : 'text-[var(--muted-foreground)]'
                }`}
              >
                {plan.description}
              </p>
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span
                    className={`text-lg ${
                      plan.highlighted ? 'opacity-80' : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
                {plan.period && (
                  <span
                    className={`block text-sm mt-1 ${
                      plan.highlighted ? 'opacity-70' : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    par application
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? 'secondary' : 'primary'}
                  size="lg"
                  className="w-full"
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
