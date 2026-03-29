const examples = [
  {
    title: 'Restaurant Le Provençal',
    category: 'Restaurant',
    colors: ['#D97706', '#92400E'],
  },
  {
    title: 'Portfolio Marie Dupont',
    category: 'Portfolio',
    colors: ['#8B5CF6', '#6D28D9'],
  },
  {
    title: 'Mariage Julie & Thomas',
    category: 'Événement',
    colors: ['#EC4899', '#BE185D'],
  },
  {
    title: 'Boulangerie Chez Paul',
    category: 'Vitrine',
    colors: ['#F59E0B', '#B45309'],
  },
  {
    title: 'CV Développeur Web',
    category: 'CV',
    colors: ['#06B6D4', '#0E7490'],
  },
  {
    title: 'Lancement Produit SaaS',
    category: 'Landing',
    colors: ['#6366F1', '#4338CA'],
  },
];

export function Examples() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Exemples d&apos;applications
        </h2>
        <p className="text-center text-[var(--muted-foreground)] mb-16 max-w-2xl mx-auto">
          Voici quelques exemples de ce que vous pouvez créer avec Happlier
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <div
              key={example.title}
              className="group rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="h-40 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${example.colors[0]}, ${example.colors[1]})`,
                }}
              >
                <span className="text-white text-lg font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                  {example.title}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{example.title}</h3>
                <span className="text-sm text-[var(--muted-foreground)]">
                  {example.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
