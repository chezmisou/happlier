import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

async function seed(app: any) {
  const { data, error } = await supabase
    .from('apps')
    .upsert({ user_id: DEMO_USER_ID, ...app }, { onConflict: 'slug' })
    .select()
    .single();
  if (error) console.error('❌', error.message);
  else console.log('✅', app.name, '→ /' + app.slug);
}

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flowmatic — Automatisez vos workflows</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #fff; color: #1e1b4b; line-height: 1.6; }
a { color: #4f46e5; text-decoration: none; }

/* Hero */
.hero { background: linear-gradient(135deg, #1e1b4b 0%, #0f0a2e 60%, #000 100%); color: #fff; text-align: center; padding: 6rem 1.5rem; }
.hero h1 { font-size: 3.25rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.02em; }
.hero h1 span { background: linear-gradient(90deg, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero .tagline { font-size: 1.25rem; opacity: 0.75; margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; }
.hero .buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.btn-primary { background: #4f46e5; color: #fff; padding: 0.85rem 2rem; border-radius: 10px; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; transition: background 0.2s; }
.btn-primary:hover { background: #4338ca; }
.btn-outline { background: transparent; color: #fff; padding: 0.85rem 2rem; border-radius: 10px; font-weight: 700; font-size: 1rem; border: 2px solid rgba(255,255,255,0.3); cursor: pointer; transition: all 0.2s; }
.btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

/* Trusted */
.trusted { text-align: center; padding: 2.5rem 1.5rem; border-bottom: 1px solid #e5e7eb; }
.trusted p { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: #9ca3af; margin-bottom: 1rem; font-weight: 600; }
.trusted .logos { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; font-size: 1rem; font-weight: 700; color: #c7d2fe; }

/* Sections */
section { max-width: 960px; margin: 0 auto; padding: 5rem 1.5rem; }
section h2 { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
section .subtitle { text-align: center; color: #6b7280; margin-bottom: 3rem; font-size: 1.05rem; }

/* Features */
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.feature-card { background: #f5f3ff; border-radius: 16px; padding: 2rem; text-align: center; transition: transform 0.2s; }
.feature-card:hover { transform: translateY(-4px); }
.feature-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: #1e1b4b; }
.feature-card p { font-size: 0.9rem; color: #6b7280; }

/* Pricing */
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; align-items: start; }
.price-card { border: 1px solid #e5e7eb; border-radius: 16px; padding: 2rem; text-align: center; position: relative; }
.price-card.popular { border: 2px solid #4f46e5; box-shadow: 0 8px 32px rgba(79,70,229,0.15); }
.price-card .badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #4f46e5; color: #fff; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 1rem; border-radius: 999px; }
.price-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
.price-card .price { font-size: 2.5rem; font-weight: 800; color: #1e1b4b; margin-bottom: 0.25rem; }
.price-card .price span { font-size: 1rem; font-weight: 500; color: #9ca3af; }
.price-card .desc { font-size: 0.85rem; color: #6b7280; margin-bottom: 1.5rem; }
.price-card ul { list-style: none; text-align: left; margin-bottom: 1.5rem; }
.price-card ul li { padding: 0.4rem 0; font-size: 0.9rem; color: #4b5563; }
.price-card ul li::before { content: '\\2713'; color: #4f46e5; font-weight: 700; margin-right: 0.5rem; }
.price-card .btn-primary { display: block; width: 100%; text-align: center; }
.price-card .btn-secondary { display: block; width: 100%; text-align: center; background: #f5f3ff; color: #4f46e5; padding: 0.75rem; border-radius: 10px; font-weight: 700; border: none; cursor: pointer; }

/* CTA */
.cta { background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); border-radius: 20px; padding: 4rem 2rem; text-align: center; color: #fff; }
.cta h2 { color: #fff; margin-bottom: 1rem; }
.cta p { opacity: 0.85; margin-bottom: 2rem; font-size: 1.05rem; }
.cta form { display: flex; justify-content: center; gap: 0.75rem; max-width: 450px; margin: 0 auto; }
.cta input { flex: 1; padding: 0.85rem 1rem; border: none; border-radius: 10px; font-size: 1rem; font-family: 'Inter', sans-serif; }
.cta input:focus { outline: none; box-shadow: 0 0 0 3px rgba(255,255,255,0.3); }
.cta button { background: #1e1b4b; color: #fff; padding: 0.85rem 1.5rem; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.95rem; transition: background 0.2s; }
.cta button:hover { background: #0f0a2e; }

/* Footer */
footer { text-align: center; padding: 2.5rem 1.5rem; font-size: 0.85rem; color: #9ca3af; }
footer .links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; }
footer .links a { color: #6b7280; font-weight: 500; }
footer .links a:hover { color: #4f46e5; }

/* Responsive */
@media (max-width: 700px) {
  .hero h1 { font-size: 2.25rem; }
  .features-grid, .pricing-grid { grid-template-columns: 1fr; }
  .cta form { flex-direction: column; }
  section { padding: 3rem 1.25rem; }
}
</style>
</head>
<body>

<header class="hero">
  <h1><span>Flowmatic</span></h1>
  <p class="tagline">Automatisez vos workflows en 5 minutes. Sans code, sans complexité.</p>
  <div class="buttons">
    <button class="btn-primary">Commencer gratuitement</button>
    <button class="btn-outline">Voir la démo</button>
  </div>
</header>

<div class="trusted">
  <p>Ils nous font confiance</p>
  <div class="logos">
    <span>TechCorp</span>
    <span>StartupFlow</span>
    <span>DataViz</span>
    <span>CloudBase</span>
    <span>ScaleUp</span>
  </div>
</div>

<section>
  <h2>Tout ce qu'il vous faut</h2>
  <p class="subtitle">Des outils puissants pour automatiser votre quotidien</p>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">&#x26A1;</div>
      <h3>Automations visuelles</h3>
      <p>Créez des workflows complexes en glisser-déposer. Aucune ligne de code requise.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#x1F517;</div>
      <h3>200+ intégrations</h3>
      <p>Connectez vos outils favoris : Slack, Gmail, Notion, Stripe, et bien plus.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">&#x1F4CA;</div>
      <h3>Analytics temps réel</h3>
      <p>Suivez la performance de vos automations avec des dashboards détaillés.</p>
    </div>
  </div>
</section>

<section>
  <h2>Tarifs simples et transparents</h2>
  <p class="subtitle">Choisissez le plan qui correspond à vos besoins</p>
  <div class="pricing-grid">
    <div class="price-card">
      <h3>Starter</h3>
      <p class="price">Gratuit</p>
      <p class="desc">Pour découvrir Flowmatic</p>
      <ul>
        <li>5 workflows actifs</li>
        <li>100 exécutions / mois</li>
        <li>10 intégrations</li>
        <li>Support communauté</li>
      </ul>
      <button class="btn-secondary">Commencer</button>
    </div>
    <div class="price-card popular">
      <span class="badge">Populaire</span>
      <h3>Pro</h3>
      <p class="price">29&euro; <span>/mois</span></p>
      <p class="desc">Pour les équipes en croissance</p>
      <ul>
        <li>Workflows illimités</li>
        <li>10 000 exécutions / mois</li>
        <li>200+ intégrations</li>
        <li>Support prioritaire</li>
        <li>Analytics avancés</li>
      </ul>
      <button class="btn-primary">Essai gratuit 14 jours</button>
    </div>
    <div class="price-card">
      <h3>Enterprise</h3>
      <p class="price">Sur devis</p>
      <p class="desc">Pour les grandes organisations</p>
      <ul>
        <li>Tout du plan Pro</li>
        <li>Exécutions illimitées</li>
        <li>SSO &amp; SAML</li>
        <li>SLA garanti 99,99%</li>
        <li>Account manager dédié</li>
      </ul>
      <button class="btn-secondary">Nous contacter</button>
    </div>
  </div>
</section>

<section>
  <div class="cta">
    <h2>Prêt à automatiser ?</h2>
    <p>Rejoignez 2 000+ entreprises qui gagnent du temps chaque jour.</p>
    <form data-collection="newsletter">
      <input type="email" name="email" required placeholder="Votre email professionnel">
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</section>

<footer>
  <div class="links">
    <a href="#">Produit</a>
    <a href="#">Tarifs</a>
    <a href="#">Documentation</a>
    <a href="#">Blog</a>
    <a href="#">Contact</a>
  </div>
  <p>&copy; 2024 Flowmatic. Tous droits réservés.</p>
</footer>

</body>
</html>`;

seed({
  name: 'Lancement Produit SaaS',
  slug: 'lancement-produit-saas',
  description: 'Landing page SaaS avec pricing et newsletter',
  category: 'landing',
  color_primary: '#4f46e5',
  color_secondary: '#6366f1',
  status: 'active',
  expires_at: null,
  generated_code: html,
});
