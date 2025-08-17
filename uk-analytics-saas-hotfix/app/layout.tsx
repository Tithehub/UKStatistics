
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK Real‑Time Analytics',
  description: 'Neutral, real‑time UK indicators from official sources.',
  icons: { icon: '/favicon.svg' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
