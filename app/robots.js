import { FRONT_END_URL } from "@/utils/baseUrl";

export default function robots() {
  const baseUrl = FRONT_END_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
      `${baseUrl}/rss.xml`,
    ],
  };
}
