import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-medium tracking-wider uppercase text-violet-600 mb-3">
                FAQ
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Questions fr&eacute;quentes
              </h1>
              <p className="text-gray-500">
                Tout ce que vous devez savoir sur Happlier
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
