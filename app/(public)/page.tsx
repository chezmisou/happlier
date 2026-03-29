'use client';
import Link from 'next/link';

export default function Home() {
  const handleDemo = async () => {
    await fetch('/api/demo', { method: 'POST' });
    window.location.href = '/dashboard';
  };

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #030712 0%, #0c0a1d 50%, #1a0e2e 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '120px 24px 100px', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.1)', marginBottom: '32px' }}>
            <span style={{ fontSize: '13px', color: '#a78bfa', fontWeight: 500, letterSpacing: '0.05em' }}>Propulsé par l&apos;IA Claude</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Créez votre app web<br /><span style={{ color: '#a78bfa' }}>en quelques minutes</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#9ca3af', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 40px' }}>
            Décrivez votre idée, personnalisez le design, et notre IA génère une application web complète. Accessible en ligne instantanément.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <Link href="/auth/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: '#7c3aed', color: '#ffffff', borderRadius: '12px', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>
              Créer mon app gratuitement
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <button onClick={handleDemo} style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 32px', background: 'transparent', color: '#ffffff', borderRadius: '12px', fontSize: '16px', fontWeight: 500, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: 'inherit' }}>
              Essayer la démo
            </button>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Gratuit 3 jours · Puis 5€/mois par app · Sans engagement</p>
        </div>
      </section>

      <section id="fonctionnement" style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 112px) 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed' }}>Comment ça marche</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, color: '#111827', marginTop: '12px' }}>Trois étapes, c&apos;est tout</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            <div style={{ padding: '32px', borderRadius: '16px', background: '#f9fafb', border: '1px solid #f3f4f6', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '22px', fontWeight: 700, color: '#7c3aed' }}>1</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Décrivez</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.6 }}>Expliquez ce que vous voulez en quelques phrases simples</p>
            </div>
            <div style={{ padding: '32px', borderRadius: '16px', background: '#f9fafb', border: '1px solid #f3f4f6', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '22px', fontWeight: 700, color: '#059669' }}>2</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Personnalisez</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.6 }}>Choisissez vos couleurs, votre logo et la catégorie</p>
            </div>
            <div style={{ padding: '32px', borderRadius: '16px', background: '#f9fafb', border: '1px solid #f3f4f6', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '22px', fontWeight: 700, color: '#d97706' }}>3</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Publiez</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.6 }}>Votre app est en ligne, partagez le lien à tout le monde</p>
            </div>
          </div>
        </div>
      </section>

      <section id="exemples" style={{ background: '#f9fafb', padding: 'clamp(64px, 8vw, 112px) 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed' }}>Exemples</span>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, color: '#111827', marginTop: '12px' }}>Découvrez ce qu&apos;on peut créer</h2>
            <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '8px' }}>Cliquez sur une carte pour voir l&apos;app en action</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Restaurant Le Provençal', cat: 'Restaurant', slug: 'restaurant-le-provencal', bg: 'linear-gradient(135deg, #d97706, #b45309)' },
              { name: 'Portfolio Marie Dupont', cat: 'Portfolio', slug: 'portfolio-marie-dupont', bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
              { name: 'Mariage Julie & Thomas', cat: 'Événement', slug: 'mariage-julie-thomas', bg: 'linear-gradient(135deg, #ec4899, #db2777)' },
              { name: 'Boulangerie Chez Paul', cat: 'Vitrine', slug: 'boulangerie-chez-paul', bg: 'linear-gradient(135deg, #f59e0b, #d97706)' },
              { name: 'CV Développeur Web', cat: 'CV', slug: 'cv-developpeur-web', bg: 'linear-gradient(135deg, #14b8a6, #0d9488)' },
              { name: 'Lancement Produit SaaS', cat: 'Landing', slug: 'lancement-produit-saas', bg: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
            ].map((app) => (
              <Link key={app.slug} href={`/${app.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#fff', border: '1px solid #e5e7eb' }}>
                  <div style={{ height: '160px', background: app.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '18px' }}>{app.name}</span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontWeight: 600, color: '#111827', fontSize: '15px', margin: 0 }}>{app.name}</p>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{app.cat}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Prêt à créer votre app ?</h2>
          <p style={{ fontSize: '17px', color: '#6b7280', marginBottom: '32px', lineHeight: 1.6 }}>Rejoignez Happlier et lancez votre application web en quelques minutes, sans aucune compétence technique.</p>
          <Link href="/auth/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', background: '#7c3aed', color: '#ffffff', borderRadius: '12px', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>
            Commencer gratuitement
          </Link>
        </div>
      </section>
    </>
  );
}
