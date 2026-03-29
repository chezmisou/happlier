'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="bg-amber-400 text-amber-950">
      <div className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Mode démo</span>
        <span className="hidden sm:inline">&mdash;</span>
        <Link href="/auth/signup" className="underline hover:no-underline font-semibold">
          Créez un compte pour sauvegarder vos apps
        </Link>
      </div>
    </div>
  );
}
