'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ background: '#ffffff', padding: 'clamp(80px, 8vw, 120px) 24px' }}>
      <div style={{ maxWidth: '540px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7c3aed' }}>Contact</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#111827', marginTop: '12px' }}>Contactez-nous</h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '12px' }}>Une question ? Un problème ? Écrivez-nous.</p>
        </div>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Message envoyé</h2>
            <p style={{ fontSize: '15px', color: '#6b7280' }}>Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Nom</label>
              <input type="text" required placeholder="Votre nom" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', fontFamily: 'inherit', background: '#fff', color: '#111827', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email</label>
              <input type="email" required placeholder="vous@exemple.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', fontFamily: 'inherit', background: '#fff', color: '#111827', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Message</label>
              <textarea required rows={5} placeholder="Votre message..." style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '15px', fontFamily: 'inherit', background: '#fff', color: '#111827', outline: 'none', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Envoyer</button>
          </form>
        )}
      </div>
    </section>
  );
}
