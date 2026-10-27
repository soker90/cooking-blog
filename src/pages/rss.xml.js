import rss from "@astrojs/rss";
import { SITE } from "../config";

const allPosts = Object.values(import.meta.glob("./blog/*.md", { eager: true }));
const typedPosts = /** @type {any[]} */ (allPosts);

const sortedPosts = typedPosts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

const escapeXml = (value: string) =>
  String(value).replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  } as Record<string, string>)[character]!);

const getImageMetadata = (image: string | undefined) => {
  if (!image) return "";

  const imageUrl = new URL(image, SITE.url).href;
  const extension = new URL(imageUrl).pathname.split(".").pop()?.toLowerCase();
  const mimeType = extension === "png" ? "image/png"
    : extension === "jpg" || extension === "jpeg" ? "image/jpeg"
    : extension === "gif" ? "image/gif"
    : "image/webp";

  return `<enclosure url="${escapeXml(imageUrl)}" length="0" type="${mimeType}" />`;
};

export const GET = () =>
  rss({
    title: `${SITE.name}`,
    description: SITE.description,
    site: import.meta.env.SITE,
    items: sortedPosts.map((item) => ({
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      link: item.url,
      pubDate: item.frontmatter.date,
      categories: item.frontmatter.tags ?? [],
      customData: getImageMetadata(item.frontmatter.image),
    })),
    customData: `<language>es-es</language>`,
    stylesheet: "/rss/styles.xsl",
  });
