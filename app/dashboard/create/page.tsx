'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ColorPicker } from '@/components/ui/color-picker';
import { createAppSchema, type CreateAppFormData } from '@/lib/validations';
import { slugify } from '@/lib/utils';
import {
  Sparkles,
  Eye,
  RotateCcw,
  ArrowLeft,
  Check,
  Upload,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

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
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(document.cookie.includes('demo_mode=true'));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateAppFormData>({
    resolver: zodResolver(createAppSchema),
    defaultValues: {
      color_primary: '#7c3aed',
      color_secondary: '#6d28d9',
    },
  });

  const name = watch('name');
  const slug = watch('slug');

  useEffect(() => {
    if (name) {
      setValue('slug', slugify(name));
    }
  }, [name, setValue]);

  const checkSlug = useCallback(async (slugValue: string) => {
    if (!slugValue || slugValue.length < 3) {
      setSlugAvailable(null);
      return;
    }
    setSlugChecking(true);
    try {
      const res = await fetch(
        `/api/check-slug?slug=${encodeURIComponent(slugValue)}`
      );
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
    if (isDemo) {
      router.push('/dashboard');
      return;
    }
    router.push('/dashboard');
    router.refresh();
  };

  // Preview state
  if (generatedCode) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Prévisualisation
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isDemo ? 'App générée en mode démo (non sauvegardée)' : 'Votre app a été générée avec succès'}
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={() => setGeneratedCode(null)} className="flex-1 sm:flex-none">
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
            <Button onClick={handlePublish} className="flex-1 sm:flex-none bg-violet-600 hover:bg-violet-700 text-white">
              <Eye className="w-4 h-4 mr-2" />
              {isDemo ? 'Retour' : 'Mettre en ligne'}
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="max-w-sm mx-auto h-6 rounded-md bg-white border border-gray-200 flex items-center px-3 text-xs text-gray-500">
                happlier.com/{slug}
              </div>
            </div>
          </div>
          <iframe
            srcDoc={generatedCode}
            className="w-full h-[400px] sm:h-[600px]"
            sandbox="allow-scripts"
            title="Prévisualisation de l'app"
          />
        </div>
      </div>
    );
  }

  // Generation loading state
  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-violet-50 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-violet-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
            <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Génération en cours...</h2>
        <p className="text-gray-500 text-center max-w-md">
          Notre IA est en train de créer votre application. Cela prend
          généralement moins d&apos;une minute.
        </p>
        <div className="mt-8 w-64 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-violet-600 animate-shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Créer une application
      </h1>
      <p className="text-gray-500 mb-8">
        {isDemo
          ? 'Testez la génération — l\'app ne sera pas sauvegardée'
          : 'Décrivez votre application et l\'IA la génère pour vous'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Identity */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
              1
            </span>
            Identité
          </div>

          <div className="space-y-2">
            <Input
              id="name"
              label="Nom de l'application"
              placeholder="Mon super site"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          <div className="space-y-2">
            <Input
              id="slug"
              label="URL de l'application"
              placeholder="mon-super-site"
              error={errors.slug?.message}
              {...register('slug')}
            />
            <div className="text-sm">
              {slugChecking && (
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Vérification...
                </span>
              )}
              {!slugChecking && slugAvailable === true && (
                <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  happlier.com/{slug} est disponible
                </span>
              )}
              {!slugChecking && slugAvailable === false && (
                <span className="text-red-500 font-medium">
                  Ce slug est déjà pris
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Select
              id="category"
              label="Catégorie (optionnel)"
              options={CATEGORIES}
              placeholder="Sélectionnez une catégorie"
              error={errors.category?.message}
              {...register('category')}
            />
          </div>
        </div>

        {/* Step 2: Description */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
              2
            </span>
            Description
          </div>

          <div className="space-y-2">
            <Textarea
              id="description"
              label="Décrivez votre application en détail"
              placeholder="Décrivez en détail ce que vous souhaitez : type de site, contenu, sections, fonctionnalités..."
              error={errors.description?.message}
              {...register('description')}
            />
          </div>
        </div>

        {/* Step 3: Design */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600">
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">
              3
            </span>
            Design
          </div>

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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Logo (optionnel)
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-300 bg-gray-50 cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              {logoFile ? (
                <div className="flex items-center gap-2 text-sm font-medium text-violet-600">
                  <Check className="w-5 h-5" />
                  <span className="truncate max-w-[200px]">{logoFile.name}</span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Cliquez pour uploader</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG ou SVG, max 2 Mo</span>
                </>
              )}
            </label>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white w-full py-3 rounded-xl text-lg">
          <Sparkles className="w-5 h-5 mr-2" />
          Générer mon app
        </Button>
      </form>
    </div>
  );
}
