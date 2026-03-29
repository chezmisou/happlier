import Link from 'next/link';

const examples = [
  {
    title: 'Restaurant Le Provençal',
    category: 'Restaurant',
    slug: 'restaurant-le-provencal',
    gradient: 'from-amber-600 to-amber-700',
  },
  {
    title: 'Portfolio Marie Dupont',
    category: 'Portfolio',
    slug: 'portfolio-marie-dupont',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    title: 'Mariage Julie & Thomas',
    category: 'Événement',
    slug: 'mariage-julie-thomas',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Boulangerie Chez Paul',
    category: 'Vitrine',
    slug: 'boulangerie-chez-paul',
    gradient: 'from-amber-500 to-yellow-600',
  },
  {
    title: 'CV Développeur Web',
    category: 'CV',
    slug: 'cv-developpeur-web',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    title: 'Lancement Produit SaaS',
    category: 'Landing',
    slug: 'lancement-produit-saas',
    gradient: 'from-indigo-500 to-violet-600',
  },
];

export function Examples() {
  return (
    <section id="examples" className="py-16 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#7c6df0] text-xs tracking-[0.2em] font-medium uppercase mb-3">
            EXEMPLES
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Découvrez ce qu&apos;on peut créer
          </h2>
          <p className="text-gray-500">
            Cliquez sur une carte pour voir l&apos;app en action
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {examples.map((example) => (
            <Link
              key={example.slug}
              href={`/${example.slug}`}
              className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition"
            >
              <div
                className={`h-32 lg:h-36 bg-gradient-to-br ${example.gradient} flex items-center justify-center`}
              >
                <span className="text-white font-semibold text-sm lg:text-base px-4 text-center">
                  {example.title}
                </span>
              </div>
              <div className="p-3 bg-white">
                <p className="font-medium text-sm text-gray-900">
                  {example.title}
                </p>
                <p className="text-xs text-gray-500">{example.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
