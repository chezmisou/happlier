import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
          Prêt à créer votre app ?
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-lg mx-auto">
          Rejoignez des centaines d&apos;utilisateurs qui ont déjà créé leur app
          web avec Happlier.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.97]"
        >
          <Sparkles className="w-5 h-5" />
          Commencer gratuitement
        </Link>
      </div>

      {/* Links */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <span className="text-xl font-extrabold gradient-text">
                Happlier
              </span>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
                Créez votre application web en quelques minutes grâce à
                l&apos;intelligence artificielle.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--foreground)]">
                Produit
              </h4>
              <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    Tarifs
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--foreground)]">
                Légal
              </h4>
              <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                <li>
                  <Link
                    href="/cgv"
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    Conditions générales de vente
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentions-legales"
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/confidentialite"
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} Happlier. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
