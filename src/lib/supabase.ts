
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Helper to check if URL is valid
const isValidUrl = (url: string | undefined) => {
    try {
        return url && url.startsWith('http');
    } catch (e) {
        return false;
    }
};

if (!isValidUrl(supabaseUrl)) {
    console.warn('WARNING: Missing or invalid NEXT_PUBLIC_SUPABASE_URL. Using placeholder to prevent crash.');
}

if (!supabaseKey) {
    console.warn('WARNING: Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Using placeholder to prevent crash.');
}

// Fallback to avoid crash during build or if env is missing (will fail on actual requests but app runs)
export const supabase = createClient(
    isValidUrl(supabaseUrl) ? supabaseUrl! : 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder'
);
