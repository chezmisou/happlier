'use client';
import { useState } from 'react';

const faqs = [
  { q: "Qu'est-ce que Happlier ?", a: "Happlier est une plateforme qui utilise l'intelligence artificielle pour créer des applications web. Vous décrivez ce que vous voulez, personnalisez les couleurs et le logo, et l'IA génère votre app complète." },
  { q: 'Comment ça marche ?', a: "C'est simple : décrivez votre idée en quelques phrases, choisissez vos couleurs et votre catégorie, puis notre IA génère votre application web complète. Elle est accessible en ligne immédiatement." },
  { q: 'Puis-je modifier mon app après sa création ?', a: "Pour le moment, vous pouvez supprimer une app et en recréer une nouvelle avec une description modifiée. La fonctionnalité d'édition directe est prévue pour une future mise à jour." },
  { q: 'Que se passe-t-il après les 3 jours gratuits ?', a: "Après 3 jours, votre app est mise hors ligne. Vous pouvez la réactiver à tout moment en souscrivant au plan Pro à 5€/mois par app. Vos données ne sont pas supprimées." },
  { q: "Quels types d'apps puis-je créer ?", a: 'Vous pouvez créer des sites vitrines, portfolios, pages événement, sites de restaurant, CV en ligne, landing pages, et bien plus encore.' },
  { q: "L'essai gratuit nécessite-t-il une carte bancaire ?", a: "Non, aucune carte bancaire n'est requise pour l'essai gratuit. Vous pouvez créer jusqu'à 2 applications et les tester pendant 3 jours chacune." },
  { q: 'Mes données sont-elles sécurisées ?', a: "Absolument. Nous utilisons Supabase avec des politiques de sécurité strictes. Chaque utilisateur n'a accès qu'à ses propres données." },
  { q: 'Comment contacter le support ?', a: 'Vous pouvez nous contacter via la page Contact ou par email. Les utilisateurs Pro bénéficient d\'un support prioritaire avec un temps de réponse de 24h.' },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(80px, 8vw, 120px) 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed' }}>FAQ</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#111827', marginTop: '12px' }}>Questions fréquentes</h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '12px' }}>Tout ce que vous devez savoir sur Happlier</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', background: '#fff' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: '16px', fontWeight: 600, color: '#111827' }}
              >
                {faq.q}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: '16px' }}>
                  <path d="M5 8l5 5 5-5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 24px 20px', fontSize: '15px', color: '#6b7280', lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
