'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#product' },
  { name: 'Services', href: '#services' },
  { name: 'News', href: '#news' },
  { name: 'Blogs', href: '#blogs' },
];

// Section IDs to track for active state
const sectionIds = ['contact', 'blogs', 'news', 'services', 'product', 'about', 'home'];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // On homepage, hide navbar until user scrolls past the hero section
      if (isHomePage) {
        const heroEl = document.getElementById('hero-frame-animation');
        if (heroEl) {
          const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
          setShowNavbar(window.scrollY > heroBottom - window.innerHeight);
        } else {
          setShowNavbar(true);
        }
      } else {
        setShowNavbar(true);
      }

      // Detect active section
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let found = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };

    if (!isHomePage) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '#') return activeSection === '';
    return `#${activeSection}` === href;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent',
        scrolled ? 'bg-black/80 backdrop-blur-xl border-brand-primary/20 py-3' : 'bg-transparent py-5',
        isHomePage && !showNavbar ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0'
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-display font-bold tracking-tighter z-50 relative uppercase group">
          <div className="relative w-10 h-10 mr-1">
            <Image
              src="/logo.png"
              alt="GenXReality Logo"
              fill
              className="object-contain"
            />
          </div>
          <span>GENX<span className="text-brand-primary">REALITY</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-all duration-300 uppercase tracking-wide relative py-1',
                isActive(link.href)
                  ? 'text-brand-primary'
                  : 'text-white/70 hover:text-white'
              )}
            >
              {link.name}
              {/* Active indicator dot */}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-primary" />
              )}
            </Link>
          ))}

          {/* CTA — Contact Us */}
          <Link
            href="#contact"
            className={cn(
              'ml-2 px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-300 border-2',
              activeSection === 'contact'
                ? 'bg-brand-primary text-black border-brand-primary shadow-[0_0_20px_rgba(0,255,65,0.4)]'
                : 'bg-brand-primary/10 text-brand-primary border-brand-primary/50 hover:bg-brand-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]'
            )}
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden opacity-0"
              />

              {/* Sliding Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-zinc-950/95 backdrop-blur-md border-l border-white/10 z-40 flex flex-col pt-24 px-6 pb-8 md:hidden shadow-2xl overflow-y-auto"
              >
                <div className="flex flex-col space-y-3 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-xl font-display font-bold transition-all duration-300 uppercase px-6 py-4 rounded-xl',
                        isActive(link.href)
                          ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/50 translate-x-2'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center w-full py-4 text-lg font-bold uppercase bg-brand-primary text-black rounded-xl hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
