import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
	loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		excerpt: z.string(),
		date: z.string(),
		type: z.enum(['essay', 'field-note']),
		published: z.boolean().default(true),
	}),
});

export const collections = { writing };
