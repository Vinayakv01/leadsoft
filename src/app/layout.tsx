import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lead CRM - SmartBuild Sales Pipeline',
  description: 'Lead CRM Dashboard for SmartBuild Sales Pipeline',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}