import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link
            href="/tarifs"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Tarifs
          </Link>
          <Link
            href="/faq"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/mentions-legales"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Mentions légales
          </Link>
        </div>
        <p className="text-xs text-gray-400 text-center">
          Happlier — Créez votre app en quelques minutes
        </p>
      </div>
    </footer>
  );
}
