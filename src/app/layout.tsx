import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Takao's Cello Studio - Professional Cello Instruction in Sydney",
  description: 'Professional cello lessons for all ages using the Suzuki method. Group lessons, private instruction, and performance opportunities in Sydney, NSW.',
  keywords: 'cello lessons, Sydney, Suzuki method, music education, private lessons, group lessons, cello instruction',
  authors: [{ name: 'Takao Cello Studio' }],
  openGraph: {
    title: "Takao's Cello Studio",
    description: 'Professional cello instruction for students of all ages in Sydney',
    url: 'https://takaocellostudio.com',
    siteName: "Takao's Cello Studio",
    locale: 'en_AU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}