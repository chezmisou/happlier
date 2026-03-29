'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-wider uppercase text-violet-600 mb-3">
            Contact
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-500">
            Une question ? Un probl&egrave;me ? &Eacute;crivez-nous.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Message envoy&eacute;</h2>
            <p className="text-gray-500 text-sm">
              Nous vous r&eacute;pondrons dans les plus brefs d&eacute;lais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                id="name"
                label="Nom"
                type="text"
                required
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                label="Email"
                type="email"
                required
                placeholder="vous@exemple.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none bg-white text-gray-900 border border-gray-200 transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                placeholder="Votre message..."
              />
            </div>
            <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white w-full py-3 rounded-xl">
              Envoyer
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
