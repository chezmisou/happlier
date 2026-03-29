import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              Mentions l&eacute;gales
            </h1>

            <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  &Eacute;diteur du site
                </h2>
                <p>Le site Happlier est &eacute;dit&eacute; par Happlier SAS.</p>
                <p className="mt-2">
                  Si&egrave;ge social : Paris, France
                  <br />
                  Email : contact@happlier.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  H&eacute;bergement
                </h2>
                <p>
                  Le site est h&eacute;berg&eacute; par Vercel Inc., 440 N Barranca Ave #4133,
                  Covina, CA 91723, &Eacute;tats-Unis.
                </p>
                <p className="mt-2">
                  Les donn&eacute;es sont stock&eacute;es par Supabase Inc. sur des serveurs
                  situ&eacute;s en Union Europ&eacute;enne.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Protection des donn&eacute;es personnelles (RGPD)
                </h2>
                <p>
                  Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es
                  (RGPD), vous disposez d&apos;un droit d&apos;acc&egrave;s, de
                  rectification, de suppression et de portabilit&eacute; de vos donn&eacute;es
                  personnelles.
                </p>
                <p className="mt-2">
                  Les donn&eacute;es collect&eacute;es sont : adresse email, mot de passe
                  (chiffr&eacute;), et les contenus des applications cr&eacute;&eacute;es. Ces donn&eacute;es
                  sont utilis&eacute;es uniquement pour le fonctionnement du service.
                </p>
                <p className="mt-2">
                  Pour exercer vos droits, contactez-nous &agrave; : contact@happlier.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Cookies
                </h2>
                <p>
                  Le site utilise des cookies strictement n&eacute;cessaires au
                  fonctionnement du service (authentification, pr&eacute;f&eacute;rences). Aucun
                  cookie publicitaire ou de tracking n&apos;est utilis&eacute;.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Propri&eacute;t&eacute; intellectuelle
                </h2>
                <p>
                  L&apos;ensemble des contenus du site Happlier (textes, images,
                  logo, code) est prot&eacute;g&eacute; par le droit de la propri&eacute;t&eacute;
                  intellectuelle. Toute reproduction est interdite sans
                  autorisation pr&eacute;alable.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
