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
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
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

  const handleOAuth = async (provider: 'google' | 'apple') => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)] bg-grid">
        <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-extrabold">Vérifiez votre email</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)] bg-grid">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-extrabold gradient-text"
          >
            <Sparkles className="w-6 h-6 text-[var(--primary)]" />
            Happlier
          </Link>
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight">
            Créer un compte
          </h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
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

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => handleOAuth('google')}>
            Google
          </Button>
          <Button variant="outline" onClick={() => handleOAuth('apple')}>
            Apple
          </Button>
        </div>

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
