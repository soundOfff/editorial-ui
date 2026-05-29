import type { Metadata } from 'next';
import 'editorial-ui/fonts.css';
import 'editorial-ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Editorial UI — Next.js Example',
  description: 'Demonstrates editorial-ui integration with Next.js 14 App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
