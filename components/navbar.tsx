'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/#fonctionnement', label: 'Fonctionnement' },
  { href: '/#exemples', label: 'Exemples' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Happlier
        </Link>
        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-300 hover:text-white transition">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" asChild>
            <Link href="/auth/login">Connexion</Link>
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
            <Link href="/auth/signup">Commencer</Link>
          </Button>
        </div>
        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg text-gray-300 hover:text-white">
                  {l.label}
                </Link>
              ))}
              <Separator className="bg-gray-800 my-2" />
              <Link href="/auth/login" onClick={() => setOpen(false)} className="text-lg text-gray-300">Connexion</Link>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white w-full" asChild>
                <Link href="/auth/signup" onClick={() => setOpen(false)}>Commencer</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
