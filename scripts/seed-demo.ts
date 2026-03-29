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
<title>Marie Dupont — Portfolio UI/UX</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #fff; color: #1a1a2e; line-height: 1.6; }
a { color: #7c3aed; text-decoration: none; }

/* Hero */
.hero { background: linear-gradient(135deg, #1a0533 0%, #2e1065 50%, #4c1d95 100%); color: #fff; text-align: center; padding: 5rem 1.5rem; }
.hero .avatar { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #a78bfa); margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; color: #fff; }
.hero h1 { font-size: 2.75rem; font-weight: 800; margin-bottom: 0.5rem; }
.hero .tagline { font-size: 1.15rem; opacity: 0.8; margin-bottom: 1.25rem; }
.hero .bio { max-width: 520px; margin: 0 auto; font-size: 0.95rem; opacity: 0.7; line-height: 1.7; }

/* Sections */
section { max-width: 960px; margin: 0 auto; padding: 4rem 1.5rem; }
section h2 { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 2.5rem; color: #1a1a2e; }
section h2 span { color: #7c3aed; }

/* Projects */
.projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.project-card { border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
.project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(124,58,237,0.12); }
.project-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 800; color: rgba(255,255,255,0.3); }
.project-card:nth-child(1) .project-thumb { background: linear-gradient(135deg, #7c3aed, #3b82f6); }
.project-card:nth-child(2) .project-thumb { background: linear-gradient(135deg, #059669, #34d399); }
.project-card:nth-child(3) .project-thumb { background: linear-gradient(135deg, #e11d48, #fb7185); }
.project-card:nth-child(4) .project-thumb { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
.project-info { padding: 1.25rem 1.5rem; }
.project-info .category { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #7c3aed; margin-bottom: 0.35rem; }
.project-info h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
.project-info p { font-size: 0.9rem; color: #6b7280; }

/* Skills */
.skills-wrap { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
.skill { background: #f3f0ff; color: #7c3aed; padding: 0.5rem 1.25rem; border-radius: 999px; font-size: 0.9rem; font-weight: 600; border: 1px solid #e0d4fc; }

/* Contact */
.contact-wrap { background: #faf5ff; border-radius: 16px; padding: 3rem 2rem; max-width: 520px; margin: 0 auto; }
form { display: flex; flex-direction: column; gap: 1.25rem; }
label { font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem; display: block; color: #374151; }
input, textarea { width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 10px; font-size: 1rem; font-family: 'Inter', sans-serif; background: #fff; }
textarea { resize: vertical; min-height: 120px; }
input:focus, textarea:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
button[type="submit"] { background: #7c3aed; color: #fff; border: none; padding: 0.85rem; border-radius: 10px; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
button[type="submit"]:hover { background: #6d28d9; }

/* Footer */
footer { background: #1a0533; color: #e2e0f0; text-align: center; padding: 2.5rem 1.5rem; font-size: 0.9rem; }
footer .links { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; }
footer .links a { color: #a78bfa; font-weight: 600; transition: color 0.2s; }
footer .links a:hover { color: #c4b5fd; }
footer .copy { opacity: 0.5; font-size: 0.8rem; }

/* Responsive */
@media (max-width: 700px) {
  .hero h1 { font-size: 2rem; }
  .projects-grid { grid-template-columns: 1fr; }
  section { padding: 3rem 1.25rem; }
}
</style>
</head>
<body>

<header class="hero">
  <div class="avatar">MD</div>
  <h1>Marie Dupont</h1>
  <p class="tagline">Designer UI/UX · Paris</p>
  <p class="bio">Passionnée par les interfaces qui allient esthétique et simplicité. 8 ans d'expérience en design produit pour des startups et grands comptes.</p>
</header>

<section>
  <h2>Mes <span>Projets</span></h2>
  <div class="projects-grid">
    <div class="project-card">
      <div class="project-thumb">N</div>
      <div class="project-info">
        <p class="category">Fintech</p>
        <h3>Néo</h3>
        <p>Application bancaire mobile repensée pour une expérience utilisateur fluide et intuitive.</p>
      </div>
    </div>
    <div class="project-card">
      <div class="project-thumb">S</div>
      <div class="project-info">
        <p class="category">E-learning</p>
        <h3>SkillUp</h3>
        <p>Plateforme de formation en ligne avec parcours personnalisés et suivi de progression.</p>
      </div>
    </div>
    <div class="project-card">
      <div class="project-thumb">V</div>
      <div class="project-info">
        <p class="category">Santé</p>
        <h3>Vitalia</h3>
        <p>Application de suivi santé et bien-être avec tableau de bord et rappels intelligents.</p>
      </div>
    </div>
    <div class="project-card">
      <div class="project-thumb">D</div>
      <div class="project-info">
        <p class="category">Analytics</p>
        <h3>DataViz</h3>
        <p>Dashboard analytique avec visualisations interactives et rapports automatisés.</p>
      </div>
    </div>
  </div>
</section>

<section>
  <h2>Mes <span>Compétences</span></h2>
  <div class="skills-wrap">
    <span class="skill">Figma</span>
    <span class="skill">Sketch</span>
    <span class="skill">Adobe XD</span>
    <span class="skill">React</span>
    <span class="skill">Tailwind CSS</span>
    <span class="skill">Framer Motion</span>
    <span class="skill">Design System</span>
    <span class="skill">Prototypage</span>
    <span class="skill">User Research</span>
    <span class="skill">Accessibilité</span>
  </div>
</section>

<section>
  <h2>Me <span>Contacter</span></h2>
  <div class="contact-wrap">
    <form data-collection="contacts">
      <div>
        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom" required placeholder="Votre nom">
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="vous@example.com">
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" required placeholder="Décrivez votre projet..."></textarea>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</section>

<footer>
  <div class="links">
    <a href="#">Dribbble</a>
    <a href="#">Behance</a>
    <a href="#">LinkedIn</a>
  </div>
  <p class="copy">© 2024 Marie Dupont. Tous droits réservés.</p>
</footer>

</body>
</html>`;

seed({
  name: 'Portfolio Marie Dupont',
  slug: 'portfolio-marie-dupont',
  description: 'Portfolio designer UI/UX',
  category: 'portfolio',
  color_primary: '#7c3aed',
  color_secondary: '#6d28d9',
  status: 'active',
  expires_at: null,
  generated_code: html,
});
