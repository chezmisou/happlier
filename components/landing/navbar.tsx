'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  dark?: boolean;
}

export function Navbar({ dark = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = !dark || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isLight
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            href="/"
            className={`text-xl font-bold transition-colors ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}
          >
            Happlier
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { href: '#how-it-works', label: 'Fonctionnement' },
              { href: '#examples', label: 'Exemples' },
              { href: '/tarifs', label: 'Tarifs' },
              { href: '/faq', label: 'FAQ' },
            ].map((link) => {
              const isAnchor = link.href.startsWith('#');
              const Tag = isAnchor ? 'a' : Link;
              return (
                <Tag
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isLight
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Tag>
              );
            })}
          </div>

          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                isLight
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium px-5 py-2 rounded-lg bg-[#7c6df0] text-white hover:bg-[#6b5ce0] transition-colors"
            >
              Commencer
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className={`w-5 h-5 ${isLight ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-5 h-5 ${isLight ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#how-it-works"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Fonctionnement
            </a>
            <a
              href="#examples"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Exemples
            </a>
            <Link
              href="/tarifs"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              href="/faq"
              className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-center py-2 border border-gray-300 rounded-lg text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-center py-2 bg-[#7c6df0] text-white rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
