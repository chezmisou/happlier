import Link from 'next/link';

export default function TarifsPage() {
  return (
    <section style={{ background: '#ffffff', padding: 'clamp(80px, 8vw, 120px) 24px' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed' }}>Tarifs</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#111827', marginTop: '12px' }}>Tarifs simples et transparents</h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '12px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>Commencez gratuitement, payez uniquement pour garder vos apps en ligne</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ borderRadius: '16px', padding: '36px', border: '1px solid #e5e7eb', background: '#fff' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Gratuit</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Pour découvrir Happlier</p>
            <div style={{ marginBottom: '28px' }}><span style={{ fontSize: '42px', fontWeight: 800, color: '#111827' }}>0€</span></div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              {["3 jours d'essai par app", "Jusqu'à 2 applications", 'Personnalisation des couleurs', 'URL en happlier.com/votre-app', 'Support par email'].map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151', padding: '8px 0' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e5e7eb', color: '#374151', background: '#fff' }}>Commencer gratuitement</Link>
          </div>
          <div style={{ borderRadius: '16px', padding: '36px', border: '2px solid #7c3aed', background: '#fff', position: 'relative', boxShadow: '0 10px 25px -5px rgba(124,58,237,0.15)' }}>
            <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#7c3aed', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '4px 16px', borderRadius: '100px' }}>Recommandé</span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Pro</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Pour garder vos apps en ligne</p>
            <div style={{ marginBottom: '28px' }}><span style={{ fontSize: '42px', fontWeight: 800, color: '#111827' }}>5€</span><span style={{ fontSize: '15px', color: '#6b7280' }}>/mois/app</span></div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              {['Tout du plan gratuit', 'Applications illimitées', "Pas d'expiration", 'Notifications SMS', 'Support prioritaire', 'Domaine personnalisé (bientôt)'].map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151', padding: '8px 0' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', background: '#7c3aed', color: '#fff' }}>Commencer l&apos;essai gratuit</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
