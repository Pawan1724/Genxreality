'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Box, Layers, Globe, Cpu, Zap, Brain, Thermometer,
  Settings, Users, DollarSign, Check, Eye, Wifi, Battery,
  Building, Code, Briefcase, GraduationCap, Mail, MapPin, Phone,
  ArrowUpRight
} from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import HeroFrameAnimation from '@/components/ui/HeroFrameAnimation';
import { articles, services } from '@/lib/cms';

gsap.registerPlugin(ScrollTrigger);

const serviceIconMap: Record<string, React.ReactNode> = {
  'Building': <Building className="w-12 h-12 text-brand-primary" />,
  'Code': <Code className="w-12 h-12 text-brand-primary" />,
  'Briefcase': <Briefcase className="w-12 h-12 text-brand-primary" />,
  'GraduationCap': <GraduationCap className="w-12 h-12 text-brand-primary" />,
};

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0, x: -50, stagger: 0.3, duration: 1, ease: 'power3.out'
      });

      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '#innovations', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      });

      gsap.from('.value-card', {
        scrollTrigger: { trigger: '#about', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      });

      gsap.from('.spec-card', {
        scrollTrigger: { trigger: '#product', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1,
      });

      gsap.from('.service-item', {
        scrollTrigger: { trigger: '#services', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      });

      gsap.from('.news-card', {
        scrollTrigger: { trigger: '#news', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO — Scroll-Driven Frame Animation */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <HeroFrameAnimation />

      {/* Anchor to skip animation when clicking Home */}
      <div id="home" className="absolute" style={{ top: '600vh' }} />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ABOUT — Mission & Core Values */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="about" className="bg-black/50 backdrop-blur-sm">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase">Our <span className="text-brand-primary">Mission</span></h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              We saw firsthand how high costs and limited accessibility were preventing VR from reaching its full potential. We are committed to democratizing access to immersive learning experiences and unlocking new use cases for VR across diverse sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">Why We Exist</h3>
              <p className="text-white/70 leading-relaxed">
                VR technology should be accessible and versatile, not just confined to gaming. By reducing costs and ensuring flexibility, we can unlock new opportunities in education, healthcare, and professional training.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To create a world where immersive technology is a tool for empowerment, education, and connection for everyone, regardless of their economic background.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold mb-4">Core Values</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              VR technology should be accessible and versatile, not just confined to gaming.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard icon={<Users className="w-8 h-8 text-brand-primary" />} title="Accessibility" description="Making VR available to everyone, breaking down barriers to entry." />
            <ValueCard icon={<Zap className="w-8 h-8 text-brand-primary" />} title="Innovation" description="Advancing VR technology for real-world applications beyond entertainment." />
            <ValueCard icon={<Globe className="w-8 h-8 text-brand-primary" />} title="Versatility" description="Expanding VR beyond gaming into education, healthcare, and professional training." />
            <ValueCard icon={<DollarSign className="w-8 h-8 text-brand-primary" />} title="Affordability" description="Ensuring cost-effective solutions without compromising performance." />
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PRODUCT — GenX One */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="product" className="bg-zinc-900/30">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase">GENX <span className="text-brand-primary">ONE</span></h2>
            <p className="text-xl text-brand-primary font-mono uppercase tracking-widest mb-8">Low-Cost, High-Performance VR</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider">Pre-order Now</Button>
              <Button variant="secondary" size="lg" className="uppercase tracking-wider">Watch Keynote</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 uppercase">Innovations & <br /><span className="text-brand-primary">Showcase.</span></h3>
              <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
                Advanced display technology at an accessible price point. The GenX One offers stunning visual clarity, seamless AI integration, and robust thermal performance without the premium price tag.
              </p>
              <Link href="/product">
                <Button className="bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider flex items-center gap-2">
                  Explore Genx One <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel border-brand-primary/20">
              <Image src="https://picsum.photos/seed/vrtech/800/800" alt="Technology" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SERVICES — Enterprise XR Solutions */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="services" className="bg-black/50">
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">Enterprise <span className="text-brand-primary">XR Solutions</span></h2>
            <p className="text-xl text-white/60">
              We help forward-thinking companies integrate spatial computing into their workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="service-item glass-card p-8 rounded-2xl border border-white/10 group">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10 group-hover:bg-brand-primary/10 transition-colors">
                  {serviceIconMap[service.icon] || <Building className="w-12 h-12 text-brand-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm line-clamp-3 mb-6">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/services">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black uppercase tracking-wider flex items-center gap-2">
                View All Services <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-zinc-900/30">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Settings className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Cost-efficient Components</h3>
                    <p className="text-white/60">High-quality parts at optimized costs to ensure affordability.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                    <p className="text-white/60">Software and hardware working in harmony for a smooth experience.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">End-user Experience</h3>
                    <p className="text-white/60">Intuitive and immersive interaction designed for everyone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-purple-500/20 z-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="w-32 h-32 text-white/20" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* NEWS — Latest Insights */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="news" className="bg-black/50">
        <Container>
          <h2 className="text-4xl md:text-6xl font-bold mb-12 uppercase">Latest <span className="text-brand-primary">Insights</span></h2>
          {/* NEWS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {articles.slice(0, 4).map((article) => (
              <div key={article.id} className="news-card flex flex-col h-full glass-card rounded-2xl overflow-hidden border border-white/10 group">
                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/10">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono uppercase border border-white/10">
                    {article.category}
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-white/40 font-mono">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors">{article.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-24">
            <Link href="/news">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black uppercase tracking-wider flex items-center gap-2">
                View All News & Research <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* BLOGS — Linked Posts / Social Updates */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div id="blogs" className="pt-12 border-t border-white/10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Company <span className="text-brand-primary">Updates</span></h2>
            <p className="text-lg text-white/60 mb-8 font-light max-w-2xl mx-auto">
              Follow our journey and read deep dives directly from our team in our latest blogs.
            </p>
            <Link href="/blogs">
              <Button className="bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider mb-8">
                Go to Company Updates
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FUTURE VISION — Timeline */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section className="border-t border-white/5">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Future Vision</h2>
            <p className="text-white/60">Our roadmap to revolutionizing the XR industry.</p>
          </div>
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary/50 via-brand-primary/20 to-transparent md:-translate-x-1/2" />
            <div className="space-y-12 md:space-y-24">
              <TimelineItem year="2025" title="Prototype & Market Entry" description="Introducing India's first truly affordable standalone VR headset." details={["Prototype completion and testing", "Crowdfunding + early adopter program", "Initial e-commerce launch"]} alignment="left" />
              <TimelineItem year="2026" title="Scale & Partnerships" description="Mass production and ecosystem development." details={["Full-scale manufacturing (50,000 units target)", "B2B sales to edtech and SMEs", "GenXReality App Store launch"]} alignment="right" />
              <TimelineItem year="2027" title="Immersive Expansion" description="Smart content and hardware evolution." details={["6DoF upgrade and AI-assisted interfaces", "Native content development hub", "Strategic alliances with game studios and edtech platforms"]} alignment="left" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CONTACT — Get in Touch */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="contact" className="bg-black/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase">Get in <span className="text-brand-primary">Touch</span></h2>
              <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
              <p className="text-xl text-white/60 mb-12">
                Have questions about our VR solutions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <Mail className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Email</h3>
                    <p className="text-white/60">contact@genxreality.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <Phone className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Phone</h3>
                    <p className="text-white/60">+91 77807 88136</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <MapPin className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Social Media</h3>
                    <p className="text-white/60">Follow us for updates<br />
                      <span className="text-brand-primary font-bold mt-2 inline-block cursor-pointer hover:underline">Follow Us</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="w-full h-64 mt-12 rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.690471450892!2d78.60266717462784!3d17.426635901674288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9f3da2cf6323%3A0x70ad222a4c12f9c6!2sGenXReality!5e0!3m2!1sen!2sin!4v1772885226964!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GenXReality Location"
                ></iframe>
              </div>
            </div>

            <div className="glass-panel p-6 md:p-10 rounded-3xl border-brand-primary/20 flex flex-col gap-10">
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Send a Message</h3>
                <div className="elfsight-app-442eee75-a698-48d4-a12d-f7e7508c2be5" data-elfsight-app-lazy></div>
              </div>

              <div className="w-full border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Book a Consultation</h3>
                <div className="w-full bg-black/40 rounded-2xl p-4 border border-white/5">
                  <div className="elfsight-app-df4f0fb5-7643-4ace-b1de-6544e4a8e337" data-elfsight-app-lazy></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="value-card glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all duration-300 group hover:-translate-y-1">
      <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit group-hover:bg-brand-primary/20 transition-colors">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}

function SpecCard({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) {
  return (
    <div className="spec-card glass-card p-8 rounded-2xl border-brand-primary/10 hover:border-brand-primary/50">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white/60 text-sm uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
}

function TimelineItem({ year, title, description, details, alignment }: { year: string, title: string, description: string, details: string[], alignment: 'left' | 'right' }) {
  return (
    <div className={`timeline-item flex flex-col md:flex-row gap-8 items-center ${alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-black border-2 border-brand-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,255,65,0.3)]">
        <span className="font-mono font-bold text-brand-primary">{year}</span>
      </div>
      <div className={`flex-1 w-full ${alignment === 'left' ? 'md:text-right' : 'md:text-left'}`}>
        <div className="glass-card p-8 rounded-2xl border border-white/10 hover:border-brand-primary/30 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-2 text-brand-primary">{title}</h3>
          <p className="text-white/80 mb-4 font-medium">{description}</p>
          <ul className={`space-y-2 text-sm text-white/60 ${alignment === 'left' ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
            {details.map((detail, index) => (
              <li key={index} className="flex items-center gap-2">
                {alignment === 'right' && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50" />}
                {detail}
                {alignment === 'left' && <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 hidden md:block" />
    </div>
  );
}
