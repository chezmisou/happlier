'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAppSchema, type CreateAppFormData } from '@/lib/validations';
import { slugify } from '@/lib/utils';
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

const COLOR_PRESETS = [
  '#7c3aed', '#6d28d9', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#0f172a', '#64748b', '#ffffff',
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', borderRadius: '10px',
  border: '1px solid #e5e7eb', fontSize: '15px', fontFamily: 'inherit',
  background: '#fff', color: '#111827', outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '14px', fontWeight: 600,
  color: '#374151', marginBottom: '6px',
};

const errorStyle: React.CSSProperties = {
  fontSize: '12px', color: '#ef4444', fontWeight: 500, marginTop: '4px',
};

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
    register, handleSubmit, watch, setValue,
    formState: { errors },
  } = useForm<CreateAppFormData>({
    resolver: zodResolver(createAppSchema),
    defaultValues: { color_primary: '#7c3aed', color_secondary: '#6d28d9' },
  });

  const name = watch('name');
  const slug = watch('slug');
  const colorPrimary = watch('color_primary');
  const colorSecondary = watch('color_secondary');

  useEffect(() => {
    if (name) setValue('slug', slugify(name));
  }, [name, setValue]);

  const checkSlug = useCallback(async (slugValue: string) => {
    if (!slugValue || slugValue.length < 3) { setSlugAvailable(null); return; }
    setSlugChecking(true);
    try {
      const res = await fetch(`/api/check-slug?slug=${encodeURIComponent(slugValue)}`);
      const data = await res.json();
      setSlugAvailable(data.available);
    } catch { setSlugAvailable(null); }
    setSlugChecking(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (slug) checkSlug(slug); }, 500);
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
      const res = await fetch('/api/generate', { method: 'POST', body: formData });
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

  const handlePublish = () => {
    router.push('/dashboard');
    if (!isDemo) router.refresh();
  };

  // =================== PREVIEW ===================
  if (generatedCode) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Prévisualisation</h1>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {isDemo ? 'App générée en mode démo (non sauvegardée)' : 'Votre app a été générée avec succès'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setGeneratedCode(null)} style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}>
              ← Recommencer
            </button>
            <button onClick={handlePublish} style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, border: 'none', background: '#7c3aed', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
              {isDemo ? '← Retour' : 'Mettre en ligne'}
            </button>
          </div>
        </div>
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fca5a5' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fcd34d' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#86efac' }} />
            </div>
            <div style={{ flex: 1, margin: '0 16px' }}>
              <div style={{ maxWidth: '320px', margin: '0 auto', height: '28px', borderRadius: '6px', background: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: '12px', color: '#9ca3af' }}>
                happlier.com/{slug}
              </div>
            </div>
          </div>
          <iframe srcDoc={generatedCode} style={{ width: '100%', height: '600px', border: 'none' }} sandbox="allow-scripts" title="Prévisualisation" />
        </div>
      </div>
    );
  }

  // =================== LOADING ===================
  if (generating) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ width: '96px', height: '96px', borderRadius: '24px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
          </svg>
          <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          </div>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Génération en cours...</h2>
        <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '400px' }}>Notre IA crée votre application. Cela prend généralement moins d&apos;une minute.</p>
        <div style={{ marginTop: '32px', width: '240px', height: '6px', borderRadius: '3px', background: '#f3f4f6', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s ease-in-out infinite' }} />
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        `}</style>
      </div>
    );
  }

  // =================== FORM ===================
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '24px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Retour au dashboard
      </Link>

      <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>Créer une application</h1>
      <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '32px' }}>
        {isDemo ? "Testez la génération — l'app ne sera pas sauvegardée" : "Décrivez votre application et l'IA la génère pour vous"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1 — Identité */}
        <div style={{ padding: '28px', borderRadius: '16px', border: '1px solid #e5e7eb', background: '#fff', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>1</div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#7c3aed' }}>Identité</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Nom de l&apos;application</label>
            <input {...register('name')} placeholder="Mon super site" style={inputStyle} />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>URL de l&apos;application</label>
            <input {...register('slug')} placeholder="mon-super-site" style={inputStyle} />
            {errors.slug && <p style={errorStyle}>{errors.slug.message}</p>}
            {slugChecking && <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Vérification...</p>}
            {!slugChecking && slugAvailable === true && (
              <p style={{ fontSize: '13px', color: '#059669', fontWeight: 500, marginTop: '4px' }}>✓ happlier.com/{slug} est disponible</p>
            )}
            {!slugChecking && slugAvailable === false && (
              <p style={{ fontSize: '13px', color: '#ef4444', fontWeight: 500, marginTop: '4px' }}>Ce slug est déjà pris</p>
            )}
          </div>

          <div>
            <label style={labelStyle}>Catégorie (optionnel)</label>
            <select {...register('category')} style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px' }}>
              <option value="">Sélectionnez une catégorie</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        {/* STEP 2 — Description */}
        <div style={{ padding: '28px', borderRadius: '16px', border: '1px solid #e5e7eb', background: '#fff', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>2</div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#7c3aed' }}>Description</span>
          </div>

          <div>
            <label style={labelStyle}>Décrivez votre application en détail</label>
            <textarea
              {...register('description')}
              rows={5}
              placeholder="Décrivez en détail ce que vous souhaitez : type de site, contenu, sections, fonctionnalités..."
              style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
            />
            {errors.description && <p style={errorStyle}>{errors.description.message}</p>}
          </div>
        </div>

        {/* STEP 3 — Design */}
        <div style={{ padding: '28px', borderRadius: '16px', border: '1px solid #e5e7eb', background: '#fff', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>3</div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#7c3aed' }}>Design</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Couleur primaire */}
            <div>
              <label style={labelStyle}>Couleur primaire</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', border: '1px solid #e5e7eb', background: colorPrimary, position: 'relative', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}>
                  <input type="color" value={colorPrimary} onChange={(e) => setValue('color_primary', e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {COLOR_PRESETS.slice(0, 6).map((c) => (
                    <button key={c} type="button" onClick={() => setValue('color_primary', c)} style={{ width: '24px', height: '24px', borderRadius: '6px', background: c, border: colorPrimary === c ? '2px solid #7c3aed' : '1px solid #e5e7eb', cursor: 'pointer', padding: 0 }} />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace', marginTop: '4px' }}>{colorPrimary}</p>
            </div>
            {/* Couleur secondaire */}
            <div>
              <label style={labelStyle}>Couleur secondaire</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', border: '1px solid #e5e7eb', background: colorSecondary, position: 'relative', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}>
                  <input type="color" value={colorSecondary} onChange={(e) => setValue('color_secondary', e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {COLOR_PRESETS.slice(6, 12).map((c) => (
                    <button key={c} type="button" onClick={() => setValue('color_secondary', c)} style={{ width: '24px', height: '24px', borderRadius: '6px', background: c, border: colorSecondary === c ? '2px solid #7c3aed' : '1px solid #e5e7eb', cursor: 'pointer', padding: 0 }} />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace', marginTop: '4px' }}>{colorSecondary}</p>
            </div>
          </div>

          {/* Logo upload */}
          <div>
            <label style={labelStyle}>Logo (optionnel)</label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '120px', borderRadius: '12px', border: '2px dashed #e5e7eb', background: '#f9fafb', cursor: 'pointer' }}>
              <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
              {logoFile ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#059669' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>
                  <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{logoFile.name}</span>
                </div>
              ) : (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: '8px' }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Cliquez pour uploader</span>
                  <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>PNG, JPG ou SVG, max 2 Mo</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Preview banner */}
        <div style={{ padding: '20px', borderRadius: '14px', background: 'linear-gradient(135deg, ' + colorPrimary + ', ' + colorSecondary + ')', marginBottom: '20px', textAlign: 'center' }}>
          <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>{name || 'Aperçu de vos couleurs'}</span>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '16px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecaca', fontSize: '14px', color: '#dc2626', fontWeight: 500, marginBottom: '20px' }}>{error}</div>
        )}

        {/* Submit */}
        <button type="submit" style={{ width: '100%', padding: '16px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '17px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg>
          Générer mon app
        </button>
      </form>
    </div>
  );
}
