import { Globe, Briefcase, Calendar, ChefHat, User, Rocket } from 'lucide-react';

const examples = [
  {
    title: 'Restaurant Le Provençal',
    category: 'Restaurant',
    icon: ChefHat,
    colors: ['#D97706', '#92400E'],
    description: 'Menu, horaires et réservation',
  },
  {
    title: 'Portfolio Marie Dupont',
    category: 'Portfolio',
    icon: Briefcase,
    colors: ['#8B5CF6', '#6D28D9'],
    description: 'Projets, compétences et contact',
  },
  {
    title: 'Mariage Julie & Thomas',
    category: 'Événement',
    icon: Calendar,
    colors: ['#EC4899', '#BE185D'],
    description: 'Invitation, lieu et RSVP',
  },
  {
    title: 'Boulangerie Chez Paul',
    category: 'Vitrine',
    icon: Globe,
    colors: ['#F59E0B', '#B45309'],
    description: 'Produits, story et localisation',
  },
  {
    title: 'CV Développeur Web',
    category: 'CV',
    icon: User,
    colors: ['#06B6D4', '#0E7490'],
    description: 'Parcours, skills et téléchargement',
  },
  {
    title: 'Lancement Produit SaaS',
    category: 'Landing',
    icon: Rocket,
    colors: ['#6366F1', '#4338CA'],
    description: 'Features, pricing et CTA',
  },
];

export function Examples() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[var(--primary)] mb-3 tracking-wide uppercase">
            Inspirez-vous
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Exemples d&apos;applications
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
            Voici quelques exemples de ce que vous pouvez créer avec Happlier
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <div
              key={example.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="h-44 flex flex-col items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${example.colors[0]}, ${example.colors[1]})`,
                }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <example.icon className="w-10 h-10 text-white/90 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white text-lg font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                  {example.title}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[var(--foreground)]">
                    {example.category}
                  </h3>
                  <span className="text-xs font-medium text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-full">
                    Exemple
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mt-1.5">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
