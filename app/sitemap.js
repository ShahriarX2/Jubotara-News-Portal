import { getMenus, getNews } from "@/lib/fetchData";
import { FRONT_END_URL } from "@/utils/baseUrl";

export default async function sitemap() {
  const baseUrl = FRONT_END_URL;

  // 1. Static Routes
  const routes = [
    "",
    "/team",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 1,
  }));

  // 2. Category Routes
  let categories = [];
  try {
    categories = await getMenus();
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${encodeURIComponent(category.slug)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // 3. News Article Routes
  let newsList = [];
  try {
    // Fetch a significant number of recent news for the sitemap
    newsList = await getNews(100);
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  const newsRoutes = newsList.map((news) => ({
    url: `${baseUrl}/news/${news.slug}`,
    lastModified: new Date(news.updated_at || news.created_at || new Date()).toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...newsRoutes];
}
