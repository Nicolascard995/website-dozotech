import { getAllPosts } from '@/lib/blog';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';

export default async function BlogCarousel({ locale }: { locale: string }) {
 const t = await getTranslations({ locale, namespace: 'Blog' });
 const posts = await getAllPosts(locale);

 // Limits to 3 latest posts for the carousel
 const latestPosts = posts.slice(0, 3);

 if (latestPosts.length === 0) {
 return null;
 }

 return (
 <section id="blog" className="py-24 bg-cream overflow-hidden">
 <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-center">
 <div>
 <span className="text-ember font-mono text-sm uppercase mb-2 block tracking-widest">{t('badge')}</span>
 <h2 className="text-4xl font-black text-white tracking-tighter">{t('title')}</h2>
 </div>
 <div className="flex gap-4">
 <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-ink hover:text-ink transition-all">
 <ChevronLeft />
 </button>
 <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-ink hover:text-ink transition-all">
 <ChevronRight />
 </button>
 </div>
 </div>

 <div className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x">
 {latestPosts.map((post) => (
 <Link
 key={post.id}
 href={`/${locale}/blog/${post.slug}`}
 className="min-w-[320px] md:min-w-[400px] rounded-3xl p-8 border border-white/5 hover:border-ember/30 transition-all snap-start group cursor-pointer block"
 >
 <div className="flex gap-2 mb-6">
 {post.translation?.tags?.map(tag => (
 <span key={tag} className="inline-block px-3 py-1 bg-ink/10 text-ember rounded-full text-[10px] font-bold uppercase">
 {tag}
 </span>
 ))}
 </div>
 <h3 className="text-2xl font-bold text-white mb-8 group-hover:text-ember transition-colors line-clamp-2">
 {post.translation?.title}
 </h3>
 <div className="flex items-center gap-4 text-slate-500 text-xs">
 <span className="flex items-center gap-1 font-mono">
 <Calendar className="w-3 h-3" />
 {new Date(post.created_at).toLocaleDateString(locale, {
 year: 'numeric',
 month: 'short',
 day: 'numeric'
 })}
 </span>
 <span className="flex items-center gap-1">
 {t('read_more')} <ArrowRight className="w-3 h-3" />
 </span>
 </div>
 </Link>
 ))}
 </div>
 </section>
 );
}
