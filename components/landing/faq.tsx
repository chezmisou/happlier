'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Qu\'est-ce que Happlier ?',
    answer:
      'Happlier est une plateforme qui utilise l\'intelligence artificielle pour créer des applications web statiques. Vous décrivez ce que vous voulez, personnalisez les couleurs et le logo, et l\'IA génère votre app complète.',
  },
  {
    question: 'Combien de temps faut-il pour créer une app ?',
    answer:
      'La génération prend généralement moins d\'une minute. Vous pouvez ensuite la personnaliser et la mettre en ligne instantanément.',
  },
  {
    question: 'Quels types d\'apps puis-je créer ?',
    answer:
      'Vous pouvez créer des sites vitrines, portfolios, pages événement, sites de restaurant, CV en ligne, landing pages, et bien plus encore.',
  },
  {
    question: 'L\'essai gratuit est-il vraiment gratuit ?',
    answer:
      'Oui ! Vous pouvez créer jusqu\'à 2 applications gratuitement. Chaque app reste en ligne pendant 3 jours. Aucune carte bancaire requise.',
  },
  {
    question: 'Comment fonctionne l\'abonnement ?',
    answer:
      'L\'abonnement est de 5€/mois par application. Il maintient votre app en ligne sans limite de temps. Vous pouvez annuler à tout moment.',
  },
  {
    question: 'Puis-je modifier mon app après sa création ?',
    answer:
      'Pour le moment, vous pouvez supprimer une app et en recréer une nouvelle avec une description modifiée. La fonctionnalité d\'édition est prévue pour une future mise à jour.',
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer:
      'Absolument. Nous utilisons Supabase (basé sur PostgreSQL) avec des politiques de sécurité strictes. Chaque utilisateur n\'a accès qu\'à ses propres données.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[var(--primary)] mb-3 tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg">
            Tout ce que vous devez savoir sur Happlier
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-[var(--primary)]/30 bg-[var(--accent)]/30 shadow-md'
                    : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/20'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-semibold transition-colors"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[var(--primary)] text-white rotate-180'
                        : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 text-[var(--muted-foreground)] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
