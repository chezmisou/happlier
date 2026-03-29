'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?redirect=${redirect}`,
      },
    });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
          Happlier
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Connexion</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Connectez-vous pour accéder à vos applications
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && (
          <p className="text-sm text-[var(--destructive)]">{error}</p>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          <LogIn className="w-4 h-4 mr-2" />
          Se connecter
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[var(--background)] text-[var(--muted-foreground)]">
            Ou continuer avec
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => handleOAuth('google')}>
          Google
        </Button>
        <Button variant="outline" onClick={() => handleOAuth('apple')}>
          Apple
        </Button>
      </div>

      <div className="text-center text-sm space-y-2">
        <Link
          href="/reset-password"
          className="text-[var(--primary)] hover:underline block"
        >
          Mot de passe oublié ?
        </Link>
        <p className="text-[var(--muted-foreground)]">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="text-[var(--primary)] hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
      <Suspense fallback={<div className="w-full max-w-md h-96 animate-pulse bg-[var(--muted)] rounded-xl" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
