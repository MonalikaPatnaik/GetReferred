import "./globals.css";
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Referrly',
  description: 'Where Referrals Meet Results',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Referrly</title>
        <meta name="description" content="Where Referrals Meet Results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
