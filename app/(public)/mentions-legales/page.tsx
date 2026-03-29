export default function MentionsLegalesPage() {
  const h2Style = { fontSize: '20px', fontWeight: 700 as const, color: '#111827', marginBottom: '12px' };
  const pStyle = { fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '8px' };

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(80px, 8vw, 120px) 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#111827' }}>Mentions légales</h1>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={h2Style}>Éditeur du site</h2>
          <p style={pStyle}>Happlier est édité par [Nom de l&apos;entreprise], [forme juridique].</p>
          <p style={pStyle}>Siège social : [Adresse]</p>
          <p style={pStyle}>Email : contact@happlier.com</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={h2Style}>Hébergement</h2>
          <p style={pStyle}>Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
          <p style={pStyle}>Base de données hébergée par Supabase Inc.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={h2Style}>Protection des données personnelles</h2>
          <p style={pStyle}>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données personnelles.</p>
          <p style={pStyle}>Pour exercer vos droits : contact@happlier.com</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={h2Style}>Cookies</h2>
          <p style={pStyle}>Le site utilise uniquement des cookies nécessaires au fonctionnement (authentification, session). Aucun cookie publicitaire n&apos;est utilisé.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={h2Style}>Propriété intellectuelle</h2>
          <p style={pStyle}>Le contenu du site Happlier est protégé par le droit d&apos;auteur. Les applications générées par les utilisateurs leur appartiennent.</p>
        </div>
      </div>
    </section>
  );
}
