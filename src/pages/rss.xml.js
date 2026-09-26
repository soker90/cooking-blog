import rss from "@astrojs/rss";
import { SITE } from "../config";

const allPosts = Object.values(import.meta.glob("./blog/*.md", { eager: true }));
const typedPosts = /** @type {any[]} */ (allPosts);

const sortedPosts = typedPosts.sort((a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime());

export const GET = () =>
  rss({
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
    items: sortedPosts.map((item) => ({
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      link: item.url,
      pubDate: item.frontmatter.date,
      customData: item.frontmatter.image
        ? `<image>${SITE.url}${item.frontmatter.image}</image>`
        : undefined,
    })),
    // (optional) inject custom xml
    customData: `<language>es-es</language>`,
    stylesheet: "/rss/styles.xsl",
  });
