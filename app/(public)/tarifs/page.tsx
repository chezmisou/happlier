import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Gratuit',
    price: '0€',
    period: '',
    description: 'Pour découvrir Happlier',
    features: [
      '3 jours d\'essai par app',
      'Jusqu\'à 2 applications',
      'Personnalisation des couleurs',
      'URL en happlier.com/votre-app',
      'Support par email',
    ],
    cta: 'Commencer gratuitement',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '5€',
    period: '/mois/app',
    description: 'Pour garder vos apps en ligne',
    features: [
      'Tout du plan gratuit',
      'Applications illimitées',
      'Pas d\'expiration',
      'Notifications SMS',
      'Support prioritaire',
      'Nom de domaine personnalisé (bientôt)',
    ],
    cta: 'Commencer l\'essai gratuit',
    href: '/signup',
    highlighted: true,
  },
];

export default function TarifsPage() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-violet-600 mb-3">
            Tarifs
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tarifs simples et transparents
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Commencez gratuitement, payez uniquement pour garder vos apps en ligne
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-8"
              style={
                plan.highlighted
                  ? { border: '2px solid #7c3aed', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }
                  : { border: '1px solid #e5e7eb' }
              }
            >
              {plan.highlighted && (
                <span className="inline-block text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full mb-4">
                  Recommandé
                </span>
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-violet-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full py-3 rounded-xl"
                style={
                  plan.highlighted
                    ? { background: '#7c3aed', color: '#ffffff' }
                    : undefined
                }
                variant={plan.highlighted ? 'default' : 'outline'}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
