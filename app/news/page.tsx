'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { articles } from '@/lib/cms';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="pt-24">
      <Section>
        <Container>
          <h1 className="text-5xl md:text-7xl font-bold mb-12">Latest Insights</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[16/9] mb-6 rounded-2xl overflow-hidden bg-zinc-900">
                  <Image 
                    src={article.coverImage} 
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono uppercase border border-white/10">
                    {article.category}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white/40 font-mono">{article.date}</span>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-brand-cyan transition-colors" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-cyan transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-white/60 line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
