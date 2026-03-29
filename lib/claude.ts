import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `Tu es un expert en développement web frontend. Tu génères des applications web statiques complètes, modernes et responsives.

RÈGLES STRICTES :
- Tu génères UNIQUEMENT un fichier HTML complet et autonome (HTML + CSS inline + JS inline si nécessaire)
- Le code doit être contenu dans une seule page HTML
- Le design doit être moderne, professionnel et responsive (mobile-first)
- Utilise des polices Google Fonts pour la typographie
- Le code doit être propre, sémantique et accessible (ARIA)
- N'utilise AUCUNE bibliothèque externe sauf Google Fonts
- Pas de liens vers des ressources externes (sauf Google Fonts et le logo fourni)
- Les images de placeholder doivent utiliser des SVG inline ou des emojis, jamais des URLs externes
- Le contenu doit être en français sauf indication contraire

PARAMÈTRES FOURNIS :
- Nom de l'app : {name}
- Description souhaitée par l'utilisateur : {description}
- Catégorie : {category}
- Couleur primaire : {colorPrimary}
- Couleur secondaire : {colorSecondary}
- URL du logo : {logoUrl} (à intégrer si fourni)

FORMULAIRES DYNAMIQUES :
- Si l'application contient des formulaires (contact, réservation, inscription, etc.), ajoute l'attribut data-collection sur chaque <form> avec un nom de collection descriptif (ex: data-collection="reservations", data-collection="contacts")
- Ajoute le script suivant juste avant </body> pour intercepter les soumissions de formulaires :
<script>
document.querySelectorAll('form[data-collection]').forEach(function(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function(value, key) { data[key] = value; });
    var btn = form.querySelector('[type="submit"]');
    if (btn) btn.disabled = true;
    fetch('/api/app-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: document.querySelector('meta[name="app-id"]')?.content,
        collection: form.getAttribute('data-collection'),
        data: data
      })
    }).then(function(res) { return res.json(); })
    .then(function() {
      form.reset();
      var msg = document.createElement('div');
      msg.textContent = 'Envoyé avec succès !';
      msg.style.cssText = 'padding:12px;margin-top:12px;background:#d1fae5;color:#065f46;border-radius:8px;text-align:center;font-weight:500;';
      form.appendChild(msg);
      setTimeout(function() { msg.remove(); }, 3000);
    }).catch(function() {
      alert('Erreur lors de l\\'envoi. Veuillez réessayer.');
    }).finally(function() {
      if (btn) btn.disabled = false;
    });
  });
});
</script>
- Chaque formulaire doit avoir des champs avec l'attribut name pour que les données soient correctement collectées

STRUCTURE ATTENDUE :
- Génère UNIQUEMENT le code HTML complet, rien d'autre
- Commence par <!DOCTYPE html> et termine par </html>
- Pas de markdown, pas d'explication, pas de commentaires autour du code
- Le HTML doit inclure les balises meta viewport et charset
- Intègre les couleurs fournies comme variables CSS personnalisées`;

interface GenerateAppParams {
  name: string;
  description: string;
  category: string | null;
  colorPrimary: string;
  colorSecondary: string;
  logoUrl: string | null;
}

export async function generateApp(params: GenerateAppParams): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Génère l'application web suivante :\n\nNom : ${params.name}\nDescription : ${params.description}\nCatégorie : ${params.category || 'non spécifiée'}\nCouleur primaire : ${params.colorPrimary}\nCouleur secondaire : ${params.colorSecondary}\nLogo : ${params.logoUrl || 'aucun logo fourni'}`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text content in Claude response');
  }

  let html = textBlock.text.trim();

  // Extract HTML if wrapped in code blocks
  const htmlMatch = html.match(/```html?\s*([\s\S]*?)```/);
  if (htmlMatch) {
    html = htmlMatch[1].trim();
  }

  if (!html.startsWith('<!DOCTYPE html>') && !html.startsWith('<html')) {
    throw new Error('Generated content is not valid HTML');
  }

  // Inject noindex meta tag
  html = html.replace(
    '<head>',
    '<head>\n<meta name="robots" content="noindex, nofollow">'
  );

  return html;
}
