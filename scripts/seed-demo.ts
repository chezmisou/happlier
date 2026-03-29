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
<title>Le Provençal — Restaurant</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: #fdf8f0; color: #3d2b1f; line-height: 1.6; }
h1, h2, h3 { font-family: 'Playfair Display', serif; }
a { color: #b45309; text-decoration: none; }

/* Hero */
.hero { background: linear-gradient(135deg, #3d2b1f 0%, #5a3e2b 100%); color: #fdf8f0; text-align: center; padding: 5rem 1.5rem; }
.hero h1 { font-size: 3rem; margin-bottom: 0.5rem; letter-spacing: 0.04em; }
.hero .tagline { font-size: 1.15rem; opacity: 0.85; margin-bottom: 0.75rem; }
.hero .address { font-size: 0.95rem; opacity: 0.65; }

/* Sections */
section { max-width: 960px; margin: 0 auto; padding: 4rem 1.5rem; }
section h2 { text-align: center; font-size: 2rem; margin-bottom: 2.5rem; color: #b45309; }

/* Menu */
.menu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.menu-col h3 { font-size: 1.35rem; color: #b45309; border-bottom: 2px solid #b45309; padding-bottom: 0.5rem; margin-bottom: 1rem; }
.menu-item { display: flex; justify-content: space-between; align-items: baseline; padding: 0.5rem 0; border-bottom: 1px dashed #d4c4a8; }
.menu-item span:last-child { font-weight: 600; color: #b45309; white-space: nowrap; margin-left: 1rem; }

/* Horaires */
.horaires-table { width: 100%; max-width: 520px; margin: 0 auto; border-collapse: collapse; }
.horaires-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #e8ddd0; }
.horaires-table tr td:first-child { font-weight: 600; }
.horaires-table tr.ferme td { color: #999; font-style: italic; }

/* Reservation */
.reservation { background: #f5ebe0; border-radius: 12px; padding: 3rem 2rem; max-width: 520px; margin: 0 auto; }
form { display: flex; flex-direction: column; gap: 1.25rem; }
label { font-weight: 500; font-size: 0.9rem; margin-bottom: 0.25rem; display: block; }
input, select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #d4c4a8; border-radius: 8px; font-size: 1rem; font-family: 'Inter', sans-serif; background: #fff; }
input:focus, select:focus { outline: none; border-color: #b45309; box-shadow: 0 0 0 3px rgba(180,83,9,0.15); }
button[type="submit"] { background: #b45309; color: #fff; border: none; padding: 0.85rem; border-radius: 8px; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
button[type="submit"]:hover { background: #d97706; }

/* Footer */
footer { background: #3d2b1f; color: #fdf8f0; text-align: center; padding: 2.5rem 1.5rem; font-size: 0.9rem; line-height: 1.8; }
footer .accent { color: #d97706; }

/* Responsive */
@media (max-width: 700px) {
  .hero h1 { font-size: 2rem; }
  .menu-grid { grid-template-columns: 1fr; }
  section { padding: 3rem 1.25rem; }
}
</style>
</head>
<body>

<header class="hero">
  <h1>Le Provençal</h1>
  <p class="tagline">Cuisine provençale authentique · Depuis 1987</p>
  <p class="address">42 Rue Saint-Ferréol, 13001 Marseille</p>
</header>

<section>
  <h2>Notre Carte</h2>
  <div class="menu-grid">
    <div class="menu-col">
      <h3>Entrées</h3>
      <div class="menu-item"><span>Soupe au pistou</span><span>9 €</span></div>
      <div class="menu-item"><span>Tapenade & crudités</span><span>8 €</span></div>
      <div class="menu-item"><span>Salade niçoise</span><span>12 €</span></div>
      <div class="menu-item"><span>Beignets de fleurs de courgette</span><span>11 €</span></div>
    </div>
    <div class="menu-col">
      <h3>Plats</h3>
      <div class="menu-item"><span>Bouillabaisse marseillaise</span><span>28 €</span></div>
      <div class="menu-item"><span>Daube provençale</span><span>22 €</span></div>
      <div class="menu-item"><span>Ratatouille gratinée</span><span>18 €</span></div>
      <div class="menu-item"><span>Loup grillé au fenouil</span><span>26 €</span></div>
    </div>
    <div class="menu-col">
      <h3>Desserts</h3>
      <div class="menu-item"><span>Tarte au citron meringuée</span><span>9 €</span></div>
      <div class="menu-item"><span>Navettes à la fleur d'oranger</span><span>7 €</span></div>
      <div class="menu-item"><span>Calisson d'Aix glacé</span><span>10 €</span></div>
    </div>
  </div>
</section>

<section>
  <h2>Horaires</h2>
  <table class="horaires-table">
    <tr class="ferme"><td>Lundi</td><td>Fermé</td></tr>
    <tr><td>Mardi – Vendredi</td><td>12h00 – 14h00 / 19h00 – 22h00</td></tr>
    <tr><td>Samedi – Dimanche</td><td>12h00 – 14h30 / 19h00 – 23h00</td></tr>
  </table>
</section>

<section>
  <h2>Réservation</h2>
  <div class="reservation">
    <form data-collection="reservations">
      <div>
        <label for="nom">Nom</label>
        <input type="text" id="nom" name="nom" required placeholder="Votre nom">
      </div>
      <div>
        <label for="telephone">Téléphone</label>
        <input type="tel" id="telephone" name="telephone" required placeholder="06 12 34 56 78">
      </div>
      <div>
        <label for="date">Date</label>
        <input type="date" id="date" name="date" required>
      </div>
      <div>
        <label for="convives">Nombre de convives</label>
        <select id="convives" name="convives" required>
          <option value="">Choisir…</option>
          <option value="1">1 personne</option>
          <option value="2">2 personnes</option>
          <option value="3">3 personnes</option>
          <option value="4">4 personnes</option>
          <option value="5">5 personnes</option>
          <option value="6">6 personnes</option>
          <option value="7">7 personnes</option>
          <option value="8">8+ personnes</option>
        </select>
      </div>
      <button type="submit">Réserver</button>
    </form>
  </div>
</section>

<footer>
  <p><span class="accent">Le Provençal</span> — Cuisine provençale authentique</p>
  <p>42 Rue Saint-Ferréol, 13001 Marseille</p>
  <p>Tél. <span class="accent">04 91 00 12 34</span></p>
</footer>

</body>
</html>`;

seed({
  name: 'Restaurant Le Provençal',
  slug: 'restaurant-le-provencal',
  description: 'Restaurant provençal traditionnel',
  category: 'restaurant',
  color_primary: '#b45309',
  color_secondary: '#d97706',
  status: 'active',
  expires_at: null,
  generated_code: html,
});
