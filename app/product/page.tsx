'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Check, Cpu, Eye, Wifi, Battery, Layers, Box, Thermometer, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '#features',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 uppercase">
              GENX ONE
            </h1>
            <p className="text-xl md:text-2xl text-brand-primary font-mono mt-4 uppercase tracking-widest">
              Low-Cost, High-Performance VR
            </p>
          </motion.div>

          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider">Pre-order Now</Button>
            <Button variant="outline" size="lg" className="uppercase tracking-wider">Watch Keynote</Button>
          </div>
        </motion.div>

        {/* Background Product Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://picsum.photos/seed/vrheadsethero/1920/1080"
            alt="GenX One Headset"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>
      </section>

      {/* Product Vision */}
      <Section id="product" className="bg-zinc-900/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">Innovations & <br /><span className="text-brand-primary">Showcase.</span></h2>
              <p className="text-lg text-white/70 mb-6 font-light leading-relaxed">
                We believe that advanced display technology shouldn&apos;t be gated behind exorbitant price tags.
                GenX One offers a truly premium immersive experience at an accessible price point. We are redefining what is possible in affordable VR hardware for both enterprise and consumers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Advanced Optical Clarity & Display Technology</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Smart AI Processing for Low Latency Tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Optimized Thermal Design for Extended Sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Ergonomic Weight Distribution</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel border-brand-primary/20">
              <Image
                src="https://picsum.photos/seed/vrtech/800/800"
                alt="Technology"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section id="features">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 uppercase">Technical Specifications</h2>
            <p className="text-white/60">Engineered for absolute performance without compromise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Eye className="w-8 h-8 text-brand-primary" />}
              title="Visual Fidelity"
              value="Advanced Display"
              description="High-resolution visuals at an accessible price point."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-brand-secondary" />}
              title="AI Integration"
              value="Smart Processing"
              description="Enhanced user experiences through intelligent computing."
            />
            <FeatureCard
              icon={<Thermometer className="w-8 h-8 text-white" />}
              title="Efficiency"
              value="Superior Thermals"
              description="Optimized hardware design for extended usage."
            />
            <FeatureCard
              icon={<Battery className="w-8 h-8 text-brand-primary" />}
              title="Battery Life"
              value="Extended Play"
              description="Long-lasting power for immersive sessions."
            />
            <FeatureCard
              icon={<Layers className="w-8 h-8 text-brand-secondary" />}
              title="Integration"
              value="Seamless"
              description="Software and hardware working in harmony."
            />
            <FeatureCard
              icon={<Box className="w-8 h-8 text-white" />}
              title="Cost"
              value="Optimized"
              description="High-quality parts at optimized costs."
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}

function FeatureCard({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) {
  return (
    <div className="feature-card glass-card p-8 rounded-2xl border-brand-primary/10 hover:border-brand-primary/50">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white/60 text-sm uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
}
