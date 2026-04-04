import { NextResponse } from "next/server";
import { getNews } from "@/lib/fetchData";
import { FRONT_END_URL } from "@/utils/baseUrl";

export async function GET() {
    const newsList = await getNews(50);

    const siteUrl = FRONT_END_URL;

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Jubotara News</title>
      <link>${siteUrl}</link>
      <description>Latest news from Jubotara</description>

      ${newsList
        .map(
            (news) => `
        <item>
          <title><![CDATA[${news.title || news.name}]]></title>
          <link>${siteUrl}/news/${news.slug}</link>
          <guid>${siteUrl}/news/${news.slug}</guid>
          <pubDate>${new Date(news.created_at || news.publishedAt).toUTCString()}</pubDate>
          <description><![CDATA[${news.summary || ""}]]></description>
        </item>
      `
        )
        .join("")}

    </channel>
  </rss>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}