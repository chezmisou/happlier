'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const links = [
  { href: '/#fonctionnement', label: 'Fonctionnement' },
  { href: '/#exemples', label: 'Exemples' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(3,7,18,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>
            Happlier
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: '14px',
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-nav">
            <Link
              href="/login"
              style={{
                fontSize: '14px',
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'color 0.2s',
              }}
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                textDecoration: 'none',
                padding: '8px 20px',
                borderRadius: '8px',
                background: '#7c3aed',
              }}
            >
              Commencer
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-nav"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M3 8h18" />
                  <path d="M3 16h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(3,7,18,0.98)',
            backdropFilter: 'blur(12px)',
            paddingTop: '80px',
            display: 'none',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ fontSize: '20px', color: '#d1d5db', textDecoration: 'none' }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              style={{ fontSize: '18px', color: '#d1d5db', textDecoration: 'none' }}
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#ffffff',
                textDecoration: 'none',
                padding: '12px 32px',
                borderRadius: '10px',
                background: '#7c3aed',
              }}
            >
              Commencer
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: block !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </>
  );
}
