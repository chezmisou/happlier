import Link from 'next/link';

const footerLinks = [
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/mentions-legales', label: 'Mentions légales' },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #e5e7eb',
        background: '#ffffff',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: '14px',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
          © 2026 Happlier — Créez votre app en quelques minutes
        </p>
      </div>
    </footer>
  );
}
