import { MessageSquare, Palette, Globe } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Décrivez',
    description:
      'Expliquez en quelques phrases ce que vous souhaitez : un site vitrine, un portfolio, une page événement...',
  },
  {
    icon: Palette,
    title: 'Personnalisez',
    description:
      'Choisissez vos couleurs, uploadez votre logo et sélectionnez une catégorie pour guider la génération.',
  },
  {
    icon: Globe,
    title: 'Publiez',
    description:
      'Votre app est générée en quelques secondes et accessible en ligne sur happlier.com/votre-app.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-[var(--muted)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Comment ça marche
        </h2>
        <p className="text-center text-[var(--muted-foreground)] mb-16 max-w-2xl mx-auto">
          Trois étapes simples pour passer de l&apos;idée à une app en ligne
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--primary)] rounded-2xl flex items-center justify-center text-[var(--primary-foreground)]">
                <step.icon className="w-8 h-8" />
              </div>
              <div className="text-sm font-medium text-[var(--primary)] mb-2">
                Étape {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-[var(--muted-foreground)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
