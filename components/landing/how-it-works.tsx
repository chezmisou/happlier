import { MessageSquare, Palette, Globe, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Décrivez',
    description:
      'Expliquez en quelques phrases ce que vous souhaitez : un site vitrine, un portfolio, une page événement...',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: Palette,
    title: 'Personnalisez',
    description:
      'Choisissez vos couleurs, uploadez votre logo et sélectionnez une catégorie pour guider la génération.',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Globe,
    title: 'Publiez',
    description:
      'Votre app est générée en quelques secondes et accessible en ligne sur happlier.com/votre-app.',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-[var(--muted)]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--primary)] mb-2 sm:mb-3 tracking-wide uppercase">
            Simple et rapide
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
            Comment ça marche
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-sm sm:text-lg">
            Trois étapes simples pour passer de l&apos;idée à une app en ligne
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group"
            >
              {/* Step number + icon */}
              <div className="relative inline-flex mb-4 sm:mb-6">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 ${step.bgColor} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <step.icon className={`w-7 h-7 sm:w-9 sm:h-9 ${step.iconColor}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-bold flex items-center justify-center shadow-lg">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Arrow between steps (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4 sm:my-6">
                  <ArrowRight className="w-5 h-5 text-[var(--muted-foreground)] rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
