'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, Sparkles } from 'lucide-react';

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

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?redirect=${redirect}`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-0">
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl sm:text-2xl font-extrabold gradient-text"
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
          Happlier
        </Link>
        <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-extrabold tracking-tight">
          Connexion
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--muted-foreground)]">
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
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-[var(--destructive)] font-medium">
            {error}
          </div>
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
          <span className="px-4 bg-[var(--background)] text-[var(--muted-foreground)]">
            Ou continuer avec
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-3 border-gray-300 text-black hover:bg-gray-50"
        onClick={handleGoogleLogin}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continuer avec Google
      </Button>

      <div className="text-center text-sm space-y-2">
        <Link
          href="/reset-password"
          className="text-[var(--primary)] hover:underline block font-medium"
        >
          Mot de passe oublié ?
        </Link>
        <p className="text-[var(--muted-foreground)]">
          Pas encore de compte ?{' '}
          <Link
            href="/signup"
            className="text-[var(--primary)] hover:underline font-semibold"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-8 bg-[var(--background)] bg-grid">
      <Suspense
        fallback={
          <div className="w-full max-w-md h-96 animate-pulse bg-[var(--muted)] rounded-2xl" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
