import { supabase } from './supabase';

export interface BlogPost {
    id: string;
    slug: string;
    image: string;
    published: boolean;
    created_at: string;
    translation: {
        title: string;
        description: string;
        content: string;
        tags: string[];
    } | null;
}

export async function getAllPosts(locale: string) {
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            *,
            translation:post_translations(
                title,
                description,
                tags,
                locale
            )
        `)
        .eq('published', true)
        .eq('translation.locale', locale)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    // Filter out posts that don't have a translation for the requested locale
    // Supabase returns an array of translations, we need to flatten it
    return posts.map(post => {
        const translation = post.translation.length > 0 ? post.translation[0] : null;
        return {
            ...post,
            translation
        };
    }).filter(post => post.translation !== null) as BlogPost[];
}

export async function getPostBySlug(slug: string, locale: string) {
    const { data: post, error } = await supabase
        .from('posts')
        .select(`
            *,
            translation:post_translations(
                title,
                description,
                content,
                tags,
                locale
            )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .eq('translation.locale', locale)
        .single();

    if (error || !post) {
        console.error('Error fetching post:', error);
        return null;
    }

    const translation = post.translation.length > 0 ? post.translation[0] : null;

    if (!translation) return null;

    return {
        ...post,
        translation
    } as BlogPost;
}
