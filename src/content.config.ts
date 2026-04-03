import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders';
import {z} from 'astro/zod';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({base: './src/content/blog', pattern: '**/*.{md,mdx}'}),
    // Type-check frontmatter using a schema
    schema: ({image}) =>
        z.object({
            title: z.string().min(1, "title is required"),
            description: z.string().min(1, "description is required"),
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            tags: z.array(z.string()).default([]),
            category: z.string().optional(),
            draft: z.boolean().default(true),
            heroImage: image().optional(),
        }),
});

export const collections = {blog};
