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
