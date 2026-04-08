'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Locale = 'en' | 'de' | 'es';

const inputClass =
    'w-full bg-cream-dark border border-cream-dark rounded-[3px] px-4 py-3 font-body text-[14px] text-ink placeholder:text-ink-muted/50 outline-none focus:border-ink transition-colors';
const labelClass = 'mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted';

export default function WaitlistSection() {
    const rawLocale = useLocale();
    const t = useTranslations('Waitlist');
    const locale: Locale = ['en', 'de', 'es'].includes(rawLocale) ? (rawLocale as Locale) : 'en';

    const [name, setName] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const benefits = ['benefit_1', 'benefit_2', 'benefit_3'] as const;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    restaurant: restaurant.trim(),
                    role: role.trim(),
                    email: email.trim(),
                    lang: locale,
                }),
            });
            const data = await res.json();

            if (!res.ok || !data.ok) {
                throw new Error(data.error ?? 'Something went wrong');
            }

            setStatus('success');
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
            setStatus('error');
        }
    };

    return (
        <section
            id="contact"
            className="py-24 md:py-32 bg-ink relative overflow-hidden"
            style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 right-[-8%] h-[360px] w-[360px] rounded-full bg-ember/18 blur-3xl" />
                <div className="absolute bottom-0 left-[-12%] h-[300px] w-[300px] rounded-full bg-cream/6 blur-3xl" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-start">
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-4">
                        {t('eyebrow')}
                    </p>

                    <h2
                        className="font-display italic text-cream leading-[1.08]"
                        style={{ fontSize: 'clamp(34px,4vw,58px)' }}
                    >
                        {t('title')}
                    </h2>

                    <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-cream/70 font-light">
                        {t('subtitle')}
                    </p>

                    <div className="mt-10 border-t border-cream/10">
                        {benefits.map((benefit, index) => (
                            <div key={benefit} className="flex gap-4 py-4 border-b border-cream/10">
                                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember/80 pt-1">
                                    {`0${index + 1}`}
                                </span>
                                <p className="text-[15px] leading-relaxed text-cream/68">
                                    {t(benefit)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[28px] bg-cream p-8 md:p-10 shadow-[0_30px_120px_rgba(0,0,0,0.24)]">
                    {status === 'success' ? (
                        <div className="rounded-[20px] bg-ink text-cream p-8">
                            <p className="font-display italic text-[32px] leading-none mb-3">
                                {t('successTitle')}
                            </p>
                            <p className="font-body font-light text-cream/72 text-[15px] leading-relaxed">
                                {t('successBody')}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    {t('nameLabel')}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t('namePlaceholder')}
                                    className={inputClass}
                                    autoComplete="name"
                                    required
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div>
                                <label htmlFor="restaurant" className={labelClass}>
                                    {t('restaurantLabel')}
                                </label>
                                <input
                                    id="restaurant"
                                    type="text"
                                    value={restaurant}
                                    onChange={(e) => setRestaurant(e.target.value)}
                                    placeholder={t('restaurantPlaceholder')}
                                    className={inputClass}
                                    autoComplete="organization"
                                    required
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className={labelClass}>
                                    {t('roleLabel')}
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder={t('rolePlaceholder')}
                                    className={inputClass}
                                    autoComplete="organization-title"
                                    required
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    {t('emailLabel')}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('emailPlaceholder')}
                                    className={inputClass}
                                    autoComplete="email"
                                    required
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-ember text-cream font-body font-medium text-[14px] py-3 rounded-[3px] hover:opacity-90 transition-opacity disabled:opacity-40"
                                >
                                    {status === 'loading' ? '···' : t('submit')}
                                </button>
                            </div>

                            {status === 'error' && (
                                <p className="md:col-span-2 text-red-700 text-[13px] font-mono">{errorMsg}</p>
                            )}

                            <p className="md:col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted mt-1">
                                {t('note')}
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
