'use client';
import { useState } from 'react';
import { useLocale } from 'next-intl';

type Status = 'idle' | 'loading' | 'success' | 'error';

const copy = {
    eyebrow: { en: 'JOIN THE WAITLIST', de: 'WARTELISTE', es: 'LISTA DE ESPERA' },
    title: { en: 'Be first in your city.', de: 'Als Erster in deiner Stadt.', es: 'Sé el primero en tu ciudad.' },
    subtitle: {
        en: "We're launching city by city — Hamburg and Lüneburg first. Leave your email and we'll reach out when we're ready for you.",
        de: 'Wir starten Stadt für Stadt — zuerst Hamburg und Lüneburg. Hinterlasse deine E-Mail und wir melden uns.',
        es: 'Lanzamos ciudad por ciudad — Hamburg y Lüneburg primero. Dejá tu email y te avisamos cuando lleguemos.',
    },
    namePlaceholder: { en: 'Your name', de: 'Dein Name', es: 'Tu nombre' },
    emailPlaceholder: { en: 'your@email.com', de: 'deine@email.com', es: 'tu@email.com' },
    submit: { en: 'Join the list', de: 'Zur Liste', es: 'Unirse' },
    note: {
        en: "No spam. We\u2019re chefs. We hate waste.",
        de: 'Kein Spam. Wir sind Köche. Wir hassen Verschwendung.',
        es: 'Sin spam. Somos chefs. Odiamos el desperdicio.',
    },
    successTitle: { en: "You\u2019re in.", de: 'Du bist dabei.', es: 'Ya estás adentro.' },
    successBody: {
        en: "Check your inbox. We\u2019ll be in touch.",
        de: 'Schau in dein Postfach. Wir melden uns.',
        es: 'Revisá tu inbox. Te avisamos pronto.',
    },
} as const;

type Locale = 'en' | 'de' | 'es';

function t(key: keyof typeof copy, locale: Locale): string {
    return copy[key][locale] ?? copy[key]['en'];
}

const inputClass =
    'w-full bg-cream-dark border border-cream-dark rounded-[3px] px-4 py-3 font-body text-[14px] text-ink placeholder:text-ink-muted/50 outline-none focus:border-ink transition-colors';

export default function WaitlistSection() {
    const rawLocale = useLocale();
    const locale: Locale = ['en', 'de', 'es'].includes(rawLocale) ? (rawLocale as Locale) : 'en';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), lang: locale }),
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
            className="py-24 bg-cream"
            style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
        >
            <div className="max-w-[480px]">
                {/* Eyebrow */}
                <p className="font-mono text-[10px] uppercase tracking-widest text-ember mb-4">
                    {t('eyebrow', locale)}
                </p>

                {/* Title */}
                <h2
                    className="font-display italic text-ink leading-[1.1] mb-4"
                    style={{ fontSize: 'clamp(28px,3vw,40px)' }}
                >
                    {t('title', locale)}
                </h2>

                {/* Subtitle */}
                <p className="font-body font-light text-ink-mid text-[15px] leading-relaxed mb-8">
                    {t('subtitle', locale)}
                </p>

                {status === 'success' ? (
                    <div className="bg-ink text-cream rounded-[4px] p-8">
                        <p className="font-display italic text-[26px] mb-2">
                            {t('successTitle', locale)}
                        </p>
                        <p className="font-body font-light text-cream/65 text-[14px]">
                            {t('successBody', locale)}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t('namePlaceholder', locale)}
                            className={inputClass}
                            required
                            disabled={status === 'loading'}
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('emailPlaceholder', locale)}
                            className={inputClass}
                            required
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-ember text-cream font-body font-medium text-[14px] py-3 rounded-[3px] hover:opacity-90 transition-opacity disabled:opacity-40"
                        >
                            {status === 'loading' ? '···' : t('submit', locale)}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-600 text-[13px] font-mono">{errorMsg}</p>
                        )}

                        <p className="font-mono text-[11px] text-ink-muted mt-1">
                            {t('note', locale)}
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
}
