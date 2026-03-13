'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import Script from 'next/script';

export default function BlogsPage() {
    return (
        <div className="pt-24 min-h-screen">
            {/* Banner Section */}
            <div className="relative h-[40vh] w-full overflow-hidden mb-12">
                <Image
                    src="https://picsum.photos/seed/vrblogbanner/1920/600"
                    alt="GenxReality Blog Banner"
                    fill
                    className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <Container>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter">Company <span className="text-brand-primary">Updates</span></h1>
                        <p className="text-xl text-white/80 max-w-2xl font-light">
                            Follow our journey, product updates, and thought leadership.
                        </p>
                    </Container>
                </div>
            </div>

            <Section id="blogs" className="bg-black/50">
                <Container>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Our <span className="text-brand-primary">Latest Posts</span></h2>
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                            We frequently share deep dives into spatial computing, engineering challenges we've solved, and announcements about the GenX One. Read our latest updates directly from our LinkedIn feed below.
                        </p>
                    </div>

                    <div className="w-full glass-card p-4 md:p-8 rounded-3xl border border-white/10 overflow-hidden min-h-[500px] mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />
                        <div className="elfsight-app-b6304e32-de05-494e-8860-97a1974ef9f5 relative z-10" data-elfsight-app-lazy></div>
                        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
                    </div>
                </Container>
            </Section>
        </div>
    );
}
