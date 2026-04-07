import { getAllPosts } from "@/lib/blog";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params;
 const posts = await getAllPosts(locale);

 // We can't use hooks in async server components directly for translations
 // But we can import getTranslations if needed, or just hardcode for MVP structure
 // Let's keep it simple for now, assuming standard layout

 return (
 <main className="min-h-screen bg-cream text-white pt-32 pb-20 px-6">
 <div className="max-w-5xl mx-auto">
 <h1 className="text-4xl md:text-6xl font-black font-display mb-4 text-center">
 Blog
 </h1>
 <p className="text-center text-white/60 max-w-2xl mx-auto mb-16">
 {locale === 'es' ? 'Entrenando el instinto con datos.' :
 locale === 'de' ? 'Den Instinkt mit Daten trainieren.' :
 'Training instinct with data.'}
 </p>

 <div className="grid md:grid-cols-2 gap-8">
 {posts.map((post) => (
 <Link
 key={post.id}
 href={`/${locale}/blog/${post.slug}`}
 className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-ember/50 transition-all"
 >
 <div className="aspect-video relative overflow-hidden">
 <img
 src={post.image}
 alt={post.translation?.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
 />
 </div>
 <div className="p-8">
 <div className="flex gap-2 mb-4">
 {post.translation?.tags?.map(tag => (
 <span key={tag} className="text-xs font-bold text-ember uppercase tracking-widest border border-ember/20 px-2 py-1 rounded">
 {tag}
 </span>
 ))}
 </div>
 <h2 className="text-2xl font-bold font-display mb-3 group-hover:text-ember transition-colors">
 {post.translation?.title}
 </h2>
 <p className="text-white/60 line-clamp-2 mb-6">
 {post.translation?.description}
 </p>
 <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
 {locale === 'es' ? 'Leer artículo' : locale === 'de' ? 'Artikel lesen' : 'Read article'}
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </span>
 </div>
 </Link>
 ))}
 </div>

 {posts.length === 0 && (
 <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
 <p className="text-white/40">
 {locale === 'es' ? 'No hay artículos publicados aún.' :
 locale === 'de' ? 'Noch keine Artikel veröffentlicht.' :
 'No articles published yet.'}
 </p>
 </div>
 )}
 </div>
 </main>
 );
}
