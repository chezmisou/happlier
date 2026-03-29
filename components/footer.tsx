import Link from 'next/link';

const footerLinks = [
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/mentions-legales', label: 'Mentions légales' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400">&copy; 2026 Happlier &mdash; Cr&eacute;ez votre app en quelques minutes</p>
      </div>
    </footer>
  );
}
