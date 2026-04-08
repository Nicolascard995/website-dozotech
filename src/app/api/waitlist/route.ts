import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subjects: Record<string, string> = {
    en: 'Thanks for your interest — Le Sous Chef',
    de: 'Danke für Ihr Interesse — Le Sous Chef',
    es: 'Gracias por tu interés — Le Sous Chef',
};

const confirmationBodies: Record<string, (lead: {
    name: string;
    restaurant: string;
    role: string;
}) => string> = {
    en: ({ name, restaurant, role }) => `Hi ${name}.

Thanks for leaving your details for Le Sous Chef.

We're finishing the product and still in an early stage. That lets us stay close to independent kitchens and small restaurant groups that want early access and want to help shape how the tool evolves.

We recorded your interest for:
Restaurant: ${restaurant}
Role: ${role}

When we have something concrete to show, we'll reach out directly.

If you want to share more context about your kitchen, just reply to this email.

Nicolás
Le Sous Chef
(still cooking)`,

    de: ({ name, restaurant, role }) => `Hallo ${name}.

Danke, dass Sie Ihre Kontaktdaten für Le Sous Chef hinterlassen haben.

Wir finalisieren das Produkt gerade und befinden uns noch in einer frühen Phase. Dadurch können wir eng mit unabhängigen Küchen und kleinen Gastronomiegruppen sprechen, die früh einsteigen und die Entwicklung mitprägen möchten.

Wir haben Ihr Interesse erfasst für:
Restaurant: ${restaurant}
Rolle: ${role}

Sobald wir etwas Konkretes zeigen können, melden wir uns direkt.

Wenn Sie uns mehr Kontext zu Ihrer Küche geben möchten, antworten Sie einfach auf diese E-Mail.

Nicolás
Le Sous Chef
(koche immer noch selbst)`,

    es: ({ name, restaurant, role }) => `Hola ${name}.

Gracias por dejar tu contacto para Le Sous Chef.

Estamos terminando el producto y seguimos en una etapa temprana. Eso nos permite hablar de cerca con cocinas independientes y pequeños grupos gastronómicos que quieran entrar antes y ayudarnos a darle forma.

Registramos tu interés para:
Restaurante: ${restaurant}
Cargo: ${role}

Cuando tengamos algo concreto para mostrarte, te vamos a escribir directamente.

Si querés sumar más contexto sobre tu operación, respondé este email.

Nicolás
Le Sous Chef
(sigo cocinando)`,
};

export async function POST(req: NextRequest) {
    let body: { name?: string; restaurant?: string; role?: string; email?: string; lang?: string };

    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name, restaurant, role, email, lang = 'en' } = body;

    if (!name || !name.trim()) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!restaurant || !restaurant.trim()) {
        return NextResponse.json({ error: 'Restaurant is required' }, { status: 400 });
    }
    if (!role || !role.trim()) {
        return NextResponse.json({ error: 'Role is required' }, { status: 400 });
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
    const cleanRestaurant = restaurant.trim();
    const cleanRole = role.trim();

    try {
        await resend.emails.send({
            from: 'Nicolás @ Le Sous Chef <hello@lesouschef.com>',
            to: cleanEmail,
            subject: subjects[locale],
            text: confirmationBodies[locale]({
                name: cleanName,
                restaurant: cleanRestaurant,
                role: cleanRole,
            }),
        });

        const notifyEmail = process.env.NOTIFY_EMAIL;
        if (notifyEmail) {
            await resend.emails.send({
                from: 'Nicolás @ Le Sous Chef <hello@lesouschef.com>',
                to: notifyEmail,
                subject: `New lead: ${cleanRestaurant} — ${cleanName} [${locale.toUpperCase()}]`,
                text: `Name: ${cleanName}\nRestaurant: ${cleanRestaurant}\nRole: ${cleanRole}\nEmail: ${cleanEmail}\nLang: ${locale.toUpperCase()}\nTimestamp: ${new Date().toISOString()}`,
            });
        }

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
