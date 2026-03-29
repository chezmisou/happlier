'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ColorPicker } from '@/components/ui/color-picker';
import { createAppSchema, type CreateAppFormData } from '@/lib/validations';
import { slugify } from '@/lib/utils';
import { Sparkles, Eye, RotateCcw } from 'lucide-react';

const CATEGORIES = [
  { value: 'vitrine', label: 'Site vitrine' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'evenement', label: 'Événement' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cv', label: 'CV en ligne' },
  { value: 'landing', label: 'Landing page' },
  { value: 'autre', label: 'Autre' },
];

export default function CreateAppPage() {
  const router = useRouter();
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateAppFormData>({
    resolver: zodResolver(createAppSchema),
    defaultValues: {
      color_primary: '#6366F1',
      color_secondary: '#4F46E5',
    },
  });

  const name = watch('name');
  const slug = watch('slug');

  // Auto-generate slug from name
  useEffect(() => {
    if (name) {
      setValue('slug', slugify(name));
    }
  }, [name, setValue]);

  // Check slug availability (debounced)
  const checkSlug = useCallback(async (slugValue: string) => {
    if (!slugValue || slugValue.length < 3) {
      setSlugAvailable(null);
      return;
    }
    setSlugChecking(true);
    try {
      const res = await fetch(`/api/check-slug?slug=${encodeURIComponent(slugValue)}`);
      const data = await res.json();
      setSlugAvailable(data.available);
    } catch {
      setSlugAvailable(null);
    }
    setSlugChecking(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slug) checkSlug(slug);
    }, 500);
    return () => clearTimeout(timer);
  }, [slug, checkSlug]);

  const onSubmit = async (data: CreateAppFormData) => {
    setError('');
    setGenerating(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('slug', data.slug);
      formData.append('description', data.description);
      if (data.category) formData.append('category', data.category);
      formData.append('color_primary', data.color_primary);
      formData.append('color_secondary', data.color_secondary);
      if (logoFile) formData.append('logo', logoFile);

      const res = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erreur lors de la génération');
      }

      const result = await res.json();
      setGeneratedCode(result.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
    setGenerating(false);
  };

  const handlePublish = async () => {
    router.push('/dashboard');
    router.refresh();
  };

  if (generatedCode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Prévisualisation</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setGeneratedCode(null)}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
            <Button onClick={handlePublish}>
              <Eye className="w-4 h-4 mr-2" />
              Mettre en ligne
            </Button>
          </div>
        </div>
        <div className="border border-[var(--border)] rounded-xl overflow-hidden">
          <iframe
            srcDoc={generatedCode}
            className="w-full h-[600px]"
            sandbox="allow-scripts"
            title="Prévisualisation de l'app"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Créer une application</h1>
      <p className="text-[var(--muted-foreground)] mb-8">
        Décrivez votre application et l&apos;IA la génère pour vous
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          id="name"
          label="Nom de l'application"
          placeholder="Mon super site"
          error={errors.name?.message}
          {...register('name')}
        />

        <div>
          <Input
            id="slug"
            label="URL de l'application"
            placeholder="mon-super-site"
            error={errors.slug?.message}
            {...register('slug')}
          />
          <div className="mt-1 text-sm">
            {slugChecking && (
              <span className="text-[var(--muted-foreground)]">Vérification...</span>
            )}
            {!slugChecking && slugAvailable === true && (
              <span className="text-green-600">happlier.com/{slug} est disponible</span>
            )}
            {!slugChecking && slugAvailable === false && (
              <span className="text-[var(--destructive)]">Ce slug est déjà pris</span>
            )}
          </div>
        </div>

        <Textarea
          id="description"
          label="Description de l'application"
          placeholder="Décrivez en détail ce que vous souhaitez : type de site, contenu, sections, fonctionnalités..."
          error={errors.description?.message}
          {...register('description')}
        />

        <Select
          id="category"
          label="Catégorie (optionnel)"
          options={CATEGORIES}
          placeholder="Sélectionnez une catégorie"
          error={errors.category?.message}
          {...register('category')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ColorPicker
            label="Couleur primaire"
            value={watch('color_primary')}
            onChange={(c) => setValue('color_primary', c)}
          />
          <ColorPicker
            label="Couleur secondaire"
            value={watch('color_secondary')}
            onChange={(c) => setValue('color_secondary', c)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Logo (optionnel)</label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-[var(--muted-foreground)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--primary)] file:text-[var(--primary-foreground)] hover:file:opacity-90"
          />
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">PNG, JPG ou SVG, max 2 Mo</p>
        </div>

        {error && (
          <p className="text-sm text-[var(--destructive)]">{error}</p>
        )}

        <Button type="submit" size="lg" className="w-full" loading={generating}>
          <Sparkles className="w-5 h-5 mr-2" />
          {generating ? 'Votre app est en cours de création...' : 'Générer mon app'}
        </Button>
      </form>
    </div>
  );
}
