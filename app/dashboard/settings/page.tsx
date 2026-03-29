'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
      const { data: { user } } = await supabase.auth.getUser();
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
      <div className="space-y-4">
        <div className="h-8 w-48 bg-[var(--muted)] rounded animate-pulse" />
        <div className="h-64 bg-[var(--muted)] rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Paramètres du compte</h1>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={profile?.email || ''}
            disabled
          />
          <Input
            id="phone"
            label="Numéro de téléphone (pour les notifications SMS)"
            type="tel"
            placeholder="+33612345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            id="plan"
            label="Plan"
            value={profile?.plan || 'free'}
            disabled
          />

          {message && (
            <p className={`text-sm ${message.includes('Erreur') ? 'text-[var(--destructive)]' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <Button onClick={handleSave} loading={saving}>
            Sauvegarder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
