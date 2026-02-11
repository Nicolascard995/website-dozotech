'use server';

import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@dozo.tech';

// Create a private client for server-side operations (bypasses RLS)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitShieldCalculatorLead(formData: {
    name: string;
    city: string;
    ticket: string;
    noshows: string;
    email: string;
    annualLoss?: number | null;
}) {
    console.log('--- NEW LEAD: SHIELD CALCULATOR ---');

    try {
        // Save to Supabase
        const { error: dbError } = await supabaseAdmin
            .from('leads')
            .insert([{
                type: 'shield_calculator',
                data: formData,
                email: formData.email,
                name: formData.name
            }]);

        if (dbError) console.error('Supabase Error:', dbError);

        // Send Email via Resend
        const { error: emailError } = await resend.emails.send({
            from: 'Dozo Tech Leads <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            subject: 'New Lead: Shield Calculator',
            html: `<p><strong>Name:</strong> ${formData.name}</p>
                   <p><strong>Email:</strong> ${formData.email}</p>
                   <p><strong>City:</strong> ${formData.city}</p>
                   <p><strong>Ticket:</strong> ${formData.ticket}</p>
                   <p><strong>No-shows:</strong> ${formData.noshows}</p>
                   <p><strong>Annual Loss:</strong> ${formData.annualLoss}</p>`
        });

        if (emailError) console.error('Resend Error:', emailError);

    } catch (e) {
        console.error('Submission error:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }

    return { success: true };
}

export async function submitRadarQuizLead(formData: {
    name: string;
    email: string;
    score: number;
    answers?: any;
}) {
    console.log('--- NEW LEAD: RADAR QUIZ ---');

    try {
        // Save to Supabase
        const { error: dbError } = await supabaseAdmin
            .from('leads')
            .insert([{
                type: 'radar_quiz',
                data: formData,
                email: formData.email,
                name: formData.name
            }]);

        if (dbError) console.error('Supabase Error:', dbError);

        // Send Email via Resend
        const { error: emailError } = await resend.emails.send({
            from: 'Dozo Tech Leads <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            subject: 'New Lead: Radar Quiz',
            html: `<p><strong>Name:</strong> ${formData.name}</p>
                   <p><strong>Email:</strong> ${formData.email}</p>
                   <p><strong>Score:</strong> ${formData.score}</p>
                   <pre>${JSON.stringify(formData.answers, null, 2)}</pre>`
        });

        if (emailError) console.error('Resend Error:', emailError);

    } catch (e) {
        console.error('Submission error:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }

    return { success: true };
}

export async function submitControlQualifyLead(formData: {
    role: string;
    revenue: string;
    painPoint: string;
    name: string;
    email: string;
    phone: string;
    businessName: string;
}) {
    console.log('--- NEW LEAD: CONTROL QUALIFY ---');

    try {
        // Save to Supabase
        const { error: dbError } = await supabaseAdmin
            .from('leads')
            .insert([{
                type: 'control_qualify',
                data: formData,
                email: formData.email,
                name: formData.name
            }]);

        if (dbError) console.error('Supabase Error:', dbError);

        // Send Email via Resend
        const { error: emailError } = await resend.emails.send({
            from: 'Dozo Tech Leads <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            subject: 'New Lead: Control Qualify',
            html: `<p><strong>Name:</strong> ${formData.name}</p>
                   <p><strong>Business Name:</strong> ${formData.businessName}</p>
                   <p><strong>Email:</strong> ${formData.email}</p>
                   <p><strong>Phone:</strong> ${formData.phone}</p>
                   <p><strong>Role:</strong> ${formData.role}</p>
                   <p><strong>Revenue:</strong> ${formData.revenue}</p>
                   <p><strong>Pain Point:</strong> ${formData.painPoint}</p>`
        });

        if (emailError) console.error('Resend Error:', emailError);

    } catch (e) {
        console.error('Submission error:', e);
        return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
    }

    return { success: true };
}

