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
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Questions fréquentes
        </h2>
        <p className="text-center text-[var(--muted-foreground)] mb-16">
          Tout ce que vous devez savoir sur Happlier
        </p>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-[var(--muted)] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-[var(--muted-foreground)]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
