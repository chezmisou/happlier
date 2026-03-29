'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Vérifiez votre email</h1>
          <p className="text-[var(--muted-foreground)]">
            Un lien de confirmation a été envoyé à <strong>{email}</strong>.
            Cliquez dessus pour activer votre compte.
          </p>
          <Link href="/login">
            <Button variant="outline">Retour à la connexion</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
            Happlier
          </Link>
          <h1 className="mt-6 text-3xl font-bold">Créer un compte</h1>
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
            <p className="text-sm text-[var(--destructive)]">{error}</p>
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

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
