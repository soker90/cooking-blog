import rss from "@astrojs/rss";
import { SITE } from "../config";

const allPosts = Object.values(import.meta.glob("./blog/*.md", { eager: true }));
const typedPosts = /** @type {any[]} */ (allPosts);

const sortedPosts = typedPosts.toSorted(
  (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
);

const XML_ESCAPES: Record<string, string> = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
};

/** @param {string} value @returns {string} */
const escapeXml = (value) =>
  value.replace(/[<>&"']/g, (character) => XML_ESCAPES[character] ?? character);

/** @param {string | undefined} image @returns {string} */
const getImageMetadata = (image) => {
  if (!image) return "";

  const imageUrl = new URL(image, SITE.url).href;
  const extension = new URL(imageUrl).pathname.split(".").pop()?.toLowerCase();
  const mimeType = extension === "png" ? "image/png"
    : extension === "jpg" || extension === "jpeg" ? "image/jpeg"
    : extension === "gif" ? "image/gif"
    : extension === "webp" ? "image/webp"
    : undefined;

  if (!mimeType) return "";

  return `<media:content xmlns:media="http://search.yahoo.com/mrss/" url="${escapeXml(imageUrl)}" medium="image" type="${mimeType}" />`;
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
