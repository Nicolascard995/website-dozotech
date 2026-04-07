import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subjects: Record<string, string> = {
    en: "You're on the list — Le Sous Chef",
    de: "Du bist auf der Liste — Le Sous Chef",
    es: "Estás en la lista — Le Sous Chef",
};

const confirmationBodies: Record<string, string> = {
    en: `Hey — you're on the list.

We're launching city by city, starting in Hamburg and Lüneburg. When we get to your city, you'll be among the first to know.

This isn't a newsletter. It's a heads-up from one cook to another — when the tool is ready for your kitchen, we'll reach you directly.

Got questions or want to talk shop? Just reply to this email.

Nicolás
Le Sous Chef
(also still cooking)`,

    de: `Hey — du bist dabei.

Wir starten Stadt für Stadt, zuerst in Hamburg und Lüneburg. Wenn wir deine Stadt erreichen, bist du unter den Ersten, die es erfahren.

Das ist kein Newsletter. Es ist ein direkter Hinweis von Koch zu Koch — wenn das Tool für deine Küche bereit ist, melden wir uns bei dir.

Fragen oder einfach quatschen? Antwort einfach auf diese Mail.

Nicolás
Le Sous Chef
(koche immer noch selbst)`,

    es: `Hola — ya estás en la lista.

Arrancamos ciudad por ciudad, empezando por Hamburg y Lüneburg. Cuando lleguemos a tu ciudad, vos vas a ser de los primeros en saberlo.

Esto no es un newsletter. Es un aviso directo de chef a chef — cuando la herramienta esté lista para tu cocina, te contactamos directamente.

¿Preguntas o querés hablar? Respondé este email.

Nicolás
Le Sous Chef
(sigo cocinando)`,
};

export async function POST(req: NextRequest) {
    let body: { name?: string; email?: string; lang?: string };

    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name, email, lang = 'en' } = body;

    if (!name || !name.trim()) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !email.trim()) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email.trim())) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const locale = ['en', 'de', 'es'].includes(lang) ? lang : 'en';
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    try {
        // 1. Confirmation email to the lead
        await resend.emails.send({
            from: 'Nicolás @ Le Sous Chef <hello@lesouschef.com>',
            to: cleanEmail,
            subject: subjects[locale],
            text: confirmationBodies[locale],
        });

        // 2. Internal notification
        const notifyEmail = process.env.NOTIFY_EMAIL;
        if (notifyEmail) {
            await resend.emails.send({
                from: 'Nicolás @ Le Sous Chef <hello@lesouschef.com>',
                to: notifyEmail,
                subject: `New lead: ${cleanName} — ${cleanEmail} [${locale.toUpperCase()}]`,
                text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nLang: ${locale.toUpperCase()}\nTimestamp: ${new Date().toISOString()}`,
            });
        }

        // 3. Add to audience if configured
        const audienceId = process.env.RESEND_AUDIENCE_ID;
        if (audienceId && audienceId !== 'PLACEHOLDER') {
            await resend.contacts.create({
                email: cleanEmail,
                firstName: cleanName.split(' ')[0],
                audienceId,
                unsubscribed: false,
            });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
