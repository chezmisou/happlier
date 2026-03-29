'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, CreditCard, Check } from 'lucide-react';
import type { Profile } from '@/types';

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
        setPhone(data.phone || '');
      }
      setLoading(false);
    }

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ phone })
      .eq('id', profile.id);

    if (error) {
      setMessage('Erreur lors de la sauvegarde');
    } else {
      setMessage('Paramètres sauvegardés');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="h-8 w-48 bg-[var(--muted)] rounded-lg animate-pulse" />
        <div className="h-80 bg-[var(--muted)] rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Paramètres du compte
        </h1>
        <p className="text-[var(--muted-foreground)] mt-1 text-sm">
          Gérez vos informations personnelles et votre abonnement
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile card */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <User className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Votre profil et vos coordonnées
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              value={profile?.email || ''}
              disabled
            />
            <div>
              <Input
                id="phone"
                label="Numéro de téléphone"
                type="tel"
                placeholder="+33612345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="mt-1 text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                Pour recevoir les notifications SMS
              </p>
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
                  message.includes('Erreur')
                    ? 'bg-red-50 text-[var(--destructive)]'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {!message.includes('Erreur') && (
                  <Check className="w-4 h-4" />
                )}
                {message}
              </div>
            )}

            <Button onClick={handleSave} loading={saving}>
              Sauvegarder
            </Button>
          </CardContent>
        </Card>

        {/* Plan card */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>Plan actuel</CardTitle>
                  <Badge variant={profile?.plan === 'free' ? 'outline' : 'success'}>
                    {profile?.plan === 'free' ? 'Gratuit' : 'Payant'}
                  </Badge>
                </div>
                <CardDescription>
                  Gérez votre abonnement
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-[var(--muted)] text-sm text-[var(--muted-foreground)]">
              {profile?.plan === 'free'
                ? 'Vous êtes sur le plan gratuit. Souscrivez à un abonnement pour garder vos apps en ligne sans limite.'
                : 'Votre abonnement est actif. Vos apps restent en ligne sans expiration.'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
