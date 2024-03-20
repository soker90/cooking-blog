import rss from '@astrojs/rss';
import { SITE } from '../config'

const allPosts = import.meta.glob('./blog/*.md', { eager: true })
const sortedPosts = Object.values(allPosts).sort((a, b) => new Date(b.date) - new Date(a.date));

console.log(sortedPosts.map(i => JSON.stringify(i, null, 2)))

export const get = () => rss({
    // `<title>` field in output xml
    title: `${SITE.name}`,
    // `<description>` field in output xml
    description: SITE.description,
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: sortedPosts.map(item => ({
        title: item.frontmatter.title,
        description: item.frontmatter.description,
        link: item.url,
        pubDate: item.frontmatter.date,
        image: `${SITE.url}${item.frontmatter.image}`,
    })),
    // (optional) inject custom xml
    customData: `<language>es-es</language>`,
    stylesheet: '/rss/styles.xsl',
});
