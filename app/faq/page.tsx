'use client';

import { useState } from 'react';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Qu\'est-ce que Happlier ?',
    answer:
      'Happlier est une plateforme qui utilise l\'intelligence artificielle pour créer des applications web. Vous décrivez ce que vous voulez, personnalisez les couleurs et le logo, et l\'IA génère votre app complète.',
  },
  {
    question: 'Comment ça marche ?',
    answer:
      'C\'est simple : décrivez votre idée en quelques phrases, choisissez vos couleurs et votre catégorie, puis notre IA génère votre application web complète. Elle est accessible en ligne immédiatement.',
  },
  {
    question: 'Puis-je modifier mon app après sa création ?',
    answer:
      'Pour le moment, vous pouvez supprimer une app et en recréer une nouvelle avec une description modifiée. La fonctionnalité d\'édition directe est prévue pour une future mise à jour.',
  },
  {
    question: 'Que se passe-t-il après les 3 jours gratuits ?',
    answer:
      'Après 3 jours, votre app est mise hors ligne. Vous pouvez la réactiver à tout moment en souscrivant au plan Pro à 5€/mois par app. Vos données ne sont pas supprimées.',
  },
  {
    question: 'Quels types d\'apps puis-je créer ?',
    answer:
      'Vous pouvez créer des sites vitrines, portfolios, pages événement, sites de restaurant, CV en ligne, landing pages, et bien plus encore.',
  },
  {
    question: 'L\'essai gratuit nécessite-t-il une carte bancaire ?',
    answer:
      'Non, aucune carte bancaire n\'est requise pour l\'essai gratuit. Vous pouvez créer jusqu\'à 2 applications et les tester pendant 3 jours chacune.',
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer:
      'Absolument. Nous utilisons Supabase avec des politiques de sécurité strictes. Chaque utilisateur n\'a accès qu\'à ses propres données. Les données sont hébergées en Europe.',
  },
  {
    question: 'Comment contacter le support ?',
    answer:
      'Vous pouvez nous contacter via la page Contact ou par email. Les utilisateurs Pro bénéficient d\'un support prioritaire avec un temps de réponse de 24h.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              Questions fréquentes
            </h1>
            <p className="text-gray-500 text-base lg:text-lg">
              Tout ce que vous devez savoir sur Happlier
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border overflow-hidden transition-colors ${
                    isOpen
                      ? 'border-[#7c6df0]/30 bg-[#eeedfe]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
