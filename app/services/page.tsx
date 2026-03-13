'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Building, Code, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { services } from '@/lib/cms';

const serviceIconMap: Record<string, React.ReactNode> = {
  'Building': <Building className="w-12 h-12 text-brand-primary" />,
  'Code': <Code className="w-12 h-12 text-brand-primary" />,
  'Briefcase': <Briefcase className="w-12 h-12 text-brand-primary" />,
  'GraduationCap': <GraduationCap className="w-12 h-12 text-brand-primary" />,
};

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mb-12">
        <Image
          src="https://picsum.photos/seed/vrservicesbanner/1920/600"
          alt="XR Services Banner"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <Container>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter">Our <span className="text-brand-primary">Services</span></h1>
            <p className="text-xl text-white/80 max-w-2xl font-light">
              Enterprise spatial computing, fully tailored to your industry operations.
            </p>
          </Container>
        </div>
      </div>

      <Section id="services" className="bg-black/50">
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">Enterprise <span className="text-brand-primary">XR Solutions</span></h2>
            <p className="text-xl text-white/60 leading-relaxed font-light">
              We help forward-thinking companies integrate spatial computing into their workflows.
              Our enterprise services range from custom software development to hardware-software integration tailored perfectly for training, simulation, and operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="service-item glass-card p-8 rounded-2xl border border-white/10 hover:border-brand-primary/30 transition-all duration-300 group hover:-translate-y-2">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10 group-hover:bg-brand-primary/10 transition-colors">
                  {serviceIconMap[service.icon] || <Building className="w-12 h-12 text-brand-primary" />}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-white/80 text-sm"><div className="w-2 h-2 rounded-full bg-brand-primary" /> Custom Application Development</li>
                  <li className="flex items-center gap-3 text-white/80 text-sm"><div className="w-2 h-2 rounded-full bg-brand-primary" /> Hardware & Software Integration</li>
                  <li className="flex items-center gap-3 text-white/80 text-sm"><div className="w-2 h-2 rounded-full bg-brand-primary" /> 24/7 Enterprise Support Maintenance</li>
                </ul>
                <button className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all group-hover:underline">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
