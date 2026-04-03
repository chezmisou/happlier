import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happlier — Créez votre app web en quelques minutes grâce à l\'IA',
  description:
    'Happlier permet à n\'importe qui de créer une application web en quelques minutes grâce à l\'IA. Décrivez, personnalisez, publiez.',
  keywords: [
    'création app',
    'IA',
    'site web',
    'no-code',
    'Claude',
    'intelligence artificielle',
  ],
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Happlier',
  },
  openGraph: {
    title: 'Happlier — Créez votre app web en quelques minutes',
    description:
      'Décrivez votre idée, personnalisez l\'apparence, et publiez votre app web en quelques minutes.',
    url: 'https://happlier.vercel.app',
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
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
