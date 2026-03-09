'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Banner Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mb-12">
        <Image 
          src="https://picsum.photos/seed/vrcontact/1920/600" 
          alt="Contact Us" 
          fill 
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <Container>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter">Contact <span className="text-brand-primary">Us</span></h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Ready to transform your reality? Let&apos;s build the future together.
            </p>
          </Container>
        </div>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8 uppercase">Get in Touch</h2>
              <p className="text-xl text-white/60 mb-12">
                Whether you&apos;re interested in our VR headsets, enterprise solutions, or just want to say hello, we&apos;d love to hear from you.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <Mail className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Email Us</h3>
                    <p className="text-white/60">hello@genxreality.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <Phone className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Call Us</h3>
                    <p className="text-white/60">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <MapPin className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Visit HQ</h3>
                    <p className="text-white/60">
                      100 Innovation Way<br/>
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.096843564999!2d-122.39567708468196!3d37.78749297975734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f7c4d3fbb%3A0x62710776781295b2!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1629823456789!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
            
            <div className="glass-panel p-8 md:p-10 rounded-3xl border-brand-primary/20">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-brand-primary uppercase tracking-wider">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary text-white transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-brand-primary uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary text-white transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-brand-primary uppercase tracking-wider">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary text-white transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-brand-primary uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary text-white transition-colors"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button className="w-full bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider">Send Message</Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
