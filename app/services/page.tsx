'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/cms';
import { ArrowRight, Building, Code, Briefcase, GraduationCap } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Building': <Building className="w-12 h-12 text-brand-cyan" />,
  'Code': <Code className="w-12 h-12 text-brand-purple" />,
  'Briefcase': <Briefcase className="w-12 h-12 text-blue-400" />,
  'GraduationCap': <GraduationCap className="w-12 h-12 text-green-400" />,
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <Section>
        <Container>
          <div className="max-w-3xl mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Enterprise XR Solutions</h1>
            <p className="text-xl text-white/60">
              We help forward-thinking companies integrate spatial computing into their workflows.
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10">
                    {iconMap[service.icon] || <Building />}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-white/70 mb-8 leading-relaxed">
                    {service.description} 
                    <br/><br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-white/80"><div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"/> Custom Development</li>
                    <li className="flex items-center gap-2 text-white/80"><div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"/> Integration Support</li>
                    <li className="flex items-center gap-2 text-white/80"><div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"/> 24/7 Maintenance</li>
                  </ul>
                  <Button variant="outline">
                    Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden glass-panel relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Placeholder for service image */}
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white/20">
                    Service Visualization
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
