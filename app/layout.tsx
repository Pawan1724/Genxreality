import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'GenXReality | Bridging the Digital Divide',
  description: 'Democratizing access to immersive learning experiences and unlocking new use cases for VR across diverse sectors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-brand-primary selection:text-black">
        <AnimatedBackground className="fixed inset-0 z-0 pointer-events-none" />
        <SmoothScroll>
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
