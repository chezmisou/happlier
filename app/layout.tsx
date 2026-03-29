import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happlier — Créez votre app web en quelques minutes grâce à l\'IA',
  description:
    'Happlier permet à n\'importe qui de créer une application web statique en quelques minutes grâce à l\'IA. Décrivez, personnalisez, publiez.',
  keywords: [
    'création app',
    'IA',
    'site web',
    'no-code',
    'Claude',
    'intelligence artificielle',
  ],
  openGraph: {
    title: 'Happlier — Créez votre app web en quelques minutes',
    description:
      'Décrivez votre idée, personnalisez l\'apparence, et publiez votre app web en quelques minutes.',
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
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
