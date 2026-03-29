'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?type=recovery`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--background)]">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">Email envoyé</h1>
          <p className="text-[var(--muted-foreground)]">
            Si un compte existe avec l&apos;adresse <strong>{email}</strong>, vous recevrez un lien de réinitialisation.
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
          <h1 className="mt-6 text-3xl font-bold">Mot de passe oublié</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
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

          {error && (
            <p className="text-sm text-[var(--destructive)]">{error}</p>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            Envoyer le lien
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
