import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8">
            Mentions légales
          </h1>

          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Éditeur du site
              </h2>
              <p>
                Le site Happlier est édité par Happlier SAS.
              </p>
              <p className="mt-2">
                Siège social : Paris, France
                <br />
                Email : contact@happlier.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Hébergement
              </h2>
              <p>
                Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
                Covina, CA 91723, États-Unis.
              </p>
              <p className="mt-2">
                Les données sont stockées par Supabase Inc. sur des serveurs
                situés en Union Européenne.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Protection des données personnelles (RGPD)
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez d&apos;un droit d&apos;accès, de
                rectification, de suppression et de portabilité de vos données
                personnelles.
              </p>
              <p className="mt-2">
                Les données collectées sont : adresse email, mot de passe
                (chiffré), et les contenus des applications créées. Ces données
                sont utilisées uniquement pour le fonctionnement du service.
              </p>
              <p className="mt-2">
                Pour exercer vos droits, contactez-nous à : contact@happlier.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Cookies
              </h2>
              <p>
                Le site utilise des cookies strictement nécessaires au
                fonctionnement du service (authentification, préférences). Aucun
                cookie publicitaire ou de tracking n&apos;est utilisé.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus du site Happlier (textes, images,
                logo, code) est protégé par le droit de la propriété
                intellectuelle. Toute reproduction est interdite sans
                autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
