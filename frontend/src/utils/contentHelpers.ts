import postsData from '../data/posts.json';
import attachmentsData from '../data/attachments.json';

export interface Post {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    excerpt: string;
    categories: string[] | string;
    post_id: string;
    featured_image?: string | null;
}

export interface Attachment {
    title: string;
    link: string;
    attachment_url: string;
    post_id: string; // The ID of the attachment itself
    parent_post_id?: string; // If available in future extraction
}

// Map of post_id to array of attachment URLs
const attachmentsByParentId: Record<string, string[]> = {};

// Helper to extract image from content
export const extractImageFromContent = (content: string): string | null => {
    if (!content) return null;
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
};

// Helper to get a unique image for a post
// Strategy: 
// 1. Featured image from XML
// 2. Content image
// 3. Fallback
// Helper to get a unique image for a post
// Strategy: 
// 1. Featured image from XML
// 2. Content image
// 3. Return NULL if no image found (No fallback to abstract images)

export const getPostImage = (post: any, index: number): string | null => {
    // 1. Featured image from XML (Best quality usually)
    if (post.featured_image) return post.featured_image;

    // 2. Image extracted from content
    const contentImage = extractImageFromContent(post.content);
    if (contentImage) return contentImage;

    // 3. Custom image assigned manually (only if explicitly set for specific override)
    if (post.custom_image) return post.custom_image;

    // No fallback image
    return null;
};

export const normalizeCategories = (categories: string[] | string): string[] => {
    if (Array.isArray(categories)) return categories;
    if (typeof categories === 'string') return [categories];
    return ['General'];
};

export const getAllCategories = (): string[] => {
    const categories = new Set<string>();
    (postsData as any[]).forEach(post => {
        const cats = normalizeCategories(post.categories);
        cats.forEach(c => {
            if (c !== 'Uncategorized') categories.add(c);
        });
    });
    return Array.from(categories).sort();
};
