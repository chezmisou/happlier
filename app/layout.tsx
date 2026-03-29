import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happlier — Créez votre app web en quelques minutes grâce à l\'IA',
  description:
    'Happlier permet à n\'importe qui de créer une application web statique en quelques minutes grâce à l\'IA. Décrivez, personnalisez, publiez.',
  keywords: ['création app', 'IA', 'site web', 'no-code', 'Claude', 'intelligence artificielle'],
  openGraph: {
    title: 'Happlier — Créez votre app web en quelques minutes',
    description: 'Décrivez votre idée, personnalisez l\'apparence, et publiez votre app web en quelques minutes.',
    url: 'https://happlier.com',
    siteName: 'Happlier',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
