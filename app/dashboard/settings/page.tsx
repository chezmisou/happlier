'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Param&egrave;tres du compte
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          G&eacute;rez vos informations personnelles et votre abonnement
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile card */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <User className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Informations personnelles</h3>
                <p className="text-sm text-gray-500">Votre profil et vos coordonn&eacute;es</p>
              </div>
            </div>

            <div className="space-y-4">
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
                <p className="mt-1 text-xs text-gray-500 flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  Pour recevoir les notifications SMS
                </p>
              </div>

              {message && (
                <div
                  className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium"
                  style={
                    message.includes('Erreur')
                      ? { background: '#fef2f2', color: '#dc2626' }
                      : { background: '#ecfdf5', color: '#047857' }
                  }
                >
                  {!message.includes('Erreur') && <Check className="w-4 h-4" />}
                  {message}
                </div>
              )}

              <Button onClick={handleSave} loading={saving} className="bg-violet-600 hover:bg-violet-700 text-white">
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>

        {/* Plan card */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-gray-900">Plan actuel</h3>
                  <Badge variant={profile?.plan === 'free' ? 'outline' : 'success'}>
                    {profile?.plan === 'free' ? 'Gratuit' : 'Payant'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">G&eacute;rez votre abonnement</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 text-sm text-gray-500">
              {profile?.plan === 'free'
                ? 'Vous êtes sur le plan gratuit. Souscrivez à un abonnement pour garder vos apps en ligne sans limite.'
                : 'Votre abonnement est actif. Vos apps restent en ligne sans expiration.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
