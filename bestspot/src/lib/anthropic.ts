import Anthropic from '@anthropic-ai/sdk';
import { extractedSchema } from './validators';
import type { ExtractedPlaceInfo } from './types';

const SYSTEM_PROMPT = `Tu es un extracteur d'informations sur des lieux (restaurants, bars, activités, hôtels) à partir de descriptions de posts sociaux.
À partir du texte fourni, retourne UNIQUEMENT un objet JSON valide avec :
{
  "placeName": string | null,
  "city": string | null,
  "country": string | null,
  "addressHints": string | null,
  "placeType": "restaurant" | "bar" | "cafe" | "activity" | "hotel" | "shop" | "other",
  "sentiment": "positive" | "neutral" | "negative",
  "reviewExcerpt": string | null
}
Si une information est absente, mets null. Ne jamais inventer.
"reviewExcerpt" doit être une citation courte (max 100 caractères) capturant l'avis.`;

let client: Anthropic | null = null;
function getClient() {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');
  client = new Anthropic({ apiKey });
  return client;
}

export async function extractPlaceFromText(text: string): Promise<ExtractedPlaceInfo> {
  const trimmed = text.slice(0, 4000);
  const message = await getClient().messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Voici la description du post :\n\n${trimmed}\n\nRetourne le JSON.`,
      },
      // Prefill to nudge the model into JSON-only output.
      { role: 'assistant', content: '{' },
    ],
  });

  const block = message.content.find((b) => b.type === 'text');
  if (!block || block.type !== 'text') {
    throw new Error('No text response from Claude');
  }
  const raw = '{' + block.text;
  const json = safeParseJson(raw);
  if (!json) throw new Error('Claude did not return valid JSON');
  return extractedSchema.parse(json);
}

function safeParseJson(s: string): unknown | null {
  // Try direct parse, then strip the first { ... } block.
  try {
    return JSON.parse(s);
  } catch {}
  const match = s.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}
