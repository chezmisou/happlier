import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-bold text-[var(--primary)]">Happlier</span>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Créez votre application web en quelques minutes grâce à l&apos;intelligence artificielle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Produit</h4>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <a href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Légal</h4>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <Link href="/cgv" className="hover:text-[var(--foreground)] transition-colors">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-[var(--foreground)] transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-[var(--foreground)] transition-colors">
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
    </footer>
  );
}
