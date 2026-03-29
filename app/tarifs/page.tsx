import Link from 'next/link';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Tarifs simples et transparents
            </h1>
            <p className="text-gray-500 text-base lg:text-lg max-w-xl mx-auto">
              Commencez gratuitement, payez uniquement pour garder vos apps en
              ligne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 sm:p-8 ${
                  plan.highlighted
                    ? 'border-2 border-[#7c6df0] shadow-lg'
                    : 'border border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <span className="inline-block text-xs font-semibold text-[#7c6df0] bg-[#eeedfe] px-3 py-1 rounded-full mb-4">
                    Recommandé
                  </span>
                )}
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-4 h-4 text-[#7c6df0] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-lg font-medium text-sm transition-colors ${
                    plan.highlighted
                      ? 'bg-[#7c6df0] text-white hover:bg-[#6b5ce0]'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
