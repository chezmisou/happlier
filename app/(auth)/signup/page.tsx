'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Sparkles, Check } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[var(--background)] bg-grid">
        <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Vérifiez votre email</h1>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Un lien de confirmation a été envoyé à{' '}
            <strong className="text-[var(--foreground)]">{email}</strong>.
            Cliquez dessus pour activer votre compte.
          </p>
          <Link href="/login">
            <Button variant="outline" size="lg">
              Retour à la connexion
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 py-8 bg-[var(--background)] bg-grid">
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
            Créer un compte
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[var(--muted-foreground)]">
            Commencez à créer vos applications en quelques minutes
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
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
            placeholder="Minimum 8 caractères"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Input
            id="confirm-password"
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-[var(--destructive)] font-medium">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            <UserPlus className="w-4 h-4 mr-2" />
            Créer mon compte
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

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Déjà un compte ?{' '}
          <Link
            href="/login"
            className="text-[var(--primary)] hover:underline font-semibold"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
