import { NextResponse } from "next/server";
import { getNews } from "@/lib/fetchData";
import { FRONT_END_URL } from "@/utils/baseUrl";

export async function GET() {
    // 1. Fetch news articles from the last 2 days
    // Max 1000 items (Google News sitemap requirement)
    let newsList = [];
    try {
        newsList = await getNews(100);
    } catch (error) {
        console.error("Error fetching news for news-sitemap:", error);
    }

    // Filter by date (last 48 hours)
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

    const recentNews = newsList.filter((news) => {
        const publishedAt = new Date(news.created_at || news.publishedAt);
        return publishedAt >= fortyEightHoursAgo;
    });

    // 2. Format as Google News Sitemap XML
    const siteUrl = FRONT_END_URL;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${recentNews
        .map(
            (news) => `
  <url>
    <loc>${siteUrl}/news/${news.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>যুবতারা নিউজ</news:name>
        <news:language>bn</news:language>
      </news:publication>
      <news:publication_date>${new Date(news.created_at || news.publishedAt).toISOString()}</news:publication_date>
      <news:title><![CDATA[${news.title || news.name}]]></news:title>
    </news:news>
  </url>
  `
        )
        .join("")}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
    });
}
