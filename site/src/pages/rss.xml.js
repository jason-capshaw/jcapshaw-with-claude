import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('writing'))
		.filter((p) => p.data.published)
		.sort((a, b) => (a.data.date > b.data.date ? -1 : 1));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.excerpt,
			pubDate: new Date(post.data.date),
			link: `/writing/${post.id}/`,
		})),
	});
}
