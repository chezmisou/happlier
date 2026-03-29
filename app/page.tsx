import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* HERO — fond dark */}
        <section className="bg-gray-950 py-24 lg:py-36">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm font-medium tracking-wider uppercase text-violet-400 mb-6">
              Propuls&eacute; par l&apos;IA Claude
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Votre app web, pr&ecirc;te en quelques minutes
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              D&eacute;crivez votre id&eacute;e, choisissez vos couleurs, et notre IA g&eacute;n&egrave;re
              une application web compl&egrave;te, accessible en ligne instantan&eacute;ment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl" asChild>
                <Link href="/auth/signup">Cr&eacute;er mon app gratuitement</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl" asChild>
                <Link href="/demo">Essayer la d&eacute;mo</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Gratuit pendant 3 jours, puis 5&euro;/mois par app
            </p>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE — fond blanc */}
        <section id="fonctionnement" className="py-20 lg:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-medium tracking-wider uppercase text-violet-600 mb-3">
                Comment &ccedil;a marche
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Trois &eacute;tapes, c&apos;est tout
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { num: '1', title: 'Décrivez', desc: 'Expliquez ce que vous voulez en quelques phrases', color: 'bg-violet-100 text-violet-700' },
                { num: '2', title: 'Personnalisez', desc: 'Couleurs, logo et catégorie de votre app', color: 'bg-emerald-100 text-emerald-700' },
                { num: '3', title: 'Publiez', desc: 'Votre app est en ligne, partagez le lien', color: 'bg-amber-100 text-amber-700' },
              ].map((step) => (
                <div key={step.num} className="text-center p-8 rounded-2xl bg-gray-50">
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mx-auto mb-5 text-xl font-bold`}>
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXEMPLES — fond gray-50 */}
        <section id="exemples" className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-medium tracking-wider uppercase text-violet-600 mb-3">
                Exemples
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                D&eacute;couvrez ce qu&apos;on peut cr&eacute;er
              </h2>
              <p className="text-gray-500">Cliquez sur une carte pour voir l&apos;app en action</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Restaurant Le Provençal', cat: 'Restaurant', slug: 'restaurant-le-provencal', gradient: 'from-amber-500 to-orange-600' },
                { name: 'Portfolio Marie Dupont', cat: 'Portfolio', slug: 'portfolio-marie-dupont', gradient: 'from-violet-500 to-purple-600' },
                { name: 'Mariage Julie & Thomas', cat: 'Événement', slug: 'mariage-julie-thomas', gradient: 'from-pink-500 to-rose-600' },
                { name: 'Boulangerie Chez Paul', cat: 'Vitrine', slug: 'boulangerie-chez-paul', gradient: 'from-yellow-500 to-amber-600' },
                { name: 'CV Développeur Web', cat: 'CV', slug: 'cv-developpeur-web', gradient: 'from-teal-500 to-emerald-600' },
                { name: 'Lancement Produit SaaS', cat: 'Landing', slug: 'lancement-produit-saas', gradient: 'from-indigo-500 to-violet-600' },
              ].map((app) => (
                <Link key={app.slug} href={`/${app.slug}`} className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className={`h-36 bg-gradient-to-br ${app.gradient} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-lg">{app.name}</span>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-500">{app.cat}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
