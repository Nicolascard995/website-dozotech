'use client';
import { useTranslations } from 'next-intl';

export default function FounderBanner() {
 const t = useTranslations('FounderBanner');

 return (
 <div className="w-full bg-ink py-3 overflow-hidden whitespace-nowrap border-y border-ember">
 <div className="flex animate-marquee">
 {[1, 2, 3, 4, 5].map((i) => (
 <span key={i} className="text-ink font-black text-xs uppercase tracking-[0.3em] mx-10">
 {t('text')}
 </span>
 ))}
 </div>
 </div>
 );
}
