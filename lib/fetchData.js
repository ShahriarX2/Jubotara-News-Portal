import { BASE_URL } from "@/utils/baseUrl";

const DEFAULT_REVALIDATE = 30;
const FALLBACK_IMAGE = "/images/img_avatar.png";

function toSlug(value = "") {
    return value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\p{L}\p{N}-]/gu, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function stripHtml(value = "") {
    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchJson(path, revalidate = DEFAULT_REVALIDATE) {
    const res = await fetch(`${BASE_URL}${path}`, {
        next: { revalidate },
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

function normalizeCategory(category = {}) {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug || toSlug(category.name),
        child: [],
    };
}

function normalizeNewsItem(item = {}) {
    const categorySlug = item.categorySlug && item.categorySlug !== item.category
        ? item.categorySlug
        : toSlug(item.category);

    const description = item.content || "";
    const imageSrc = item.imageSrc?.trim() || FALLBACK_IMAGE;

    return {
        id: item.id,
        slug: item.slug,
        name: item.headline,
        title: item.headline,
        description,
        summary: stripHtml(description).slice(0, 200),
        featured_image: imageSrc,
        image: imageSrc,
        created_at: item.publishedAt,
        updated_at: item.publishedAt,
        meta_title: item.metaTitle,
        meta_description: item.metaDescription,
        categories: item.category
            ? [
                {
                    id: categorySlug,
                    name: item.category,
                    slug: categorySlug,
                },
            ]
            : [],
        author: {
            full_name: item.reporterInfo || "নিজস্ব প্রতিবেদক",
        },
        extra_fields: [],
        visitor_count: item.viewsCount || 0,
        views_count: item.viewsCount || 0,
    };
}

function normalizeMenuItem(item = {}) {
    const href = item.href || "";
    const slug = href.startsWith("/category/") ? href.replace("/category/", "") : toSlug(item.label);

    return {
        id: item.id,
        name: item.label,
        label: item.label,
        slug,
        link: slug,
        href,
        child: [],
    };
}

function normalizeVideoItem(item = {}) {
    const slug = item.videoId || item.id;
    const youtubeUrl = item.youtubeUrl?.trim() || "";

    return {
        id: item.id,
        slug,
        name: item.title,
        title: item.title,
        description: "",
        meta_description: "",
        created_at: item.createdAt || null,
        main_category: { name: "ভিডিও" },
        extra_fields: [
            {
                meta_name: "video_url",
                meta_value: youtubeUrl,
            },
        ],
    };
}

function normalizeSettings(settings = {}, logo = {}) {
    const items = [];

    if (Array.isArray(settings)) {
        settings.forEach((item) => {
            if (item?.key) {
                items.push({
                    meta_name: item.key,
                    meta_value: item.value,
                });
            }
        });
    } else {
        Object.entries(settings).forEach(([key, value]) => {
            items.push({
                meta_name: key,
                meta_value: value,
            });
        });
    }

    if (logo?.logoUrl) {
        items.push({
            meta_name: "site_logoimg_id",
            meta_value: logo.logoUrl,
        });
    }

    return items;
}

function adaptMeta(meta = {}) {
    return {
        current_page: meta.page || 1,
        per_page: meta.perPage || 10,
        total: meta.total || 0,
        last_page: meta.totalPages || 1,
        totalPages: meta.totalPages || 1,
    };
}

function paginateArray(items, page = 1, perPage = 10) {
    const safePage = Number.parseInt(page, 10) || 1;
    const safePerPage = Number.parseInt(perPage, 10) || 10;
    const start = (safePage - 1) * safePerPage;
    const sliced = items.slice(start, start + safePerPage);

    return {
        success: true,
        data: sliced,
        meta: {
            current_page: safePage,
            per_page: safePerPage,
            total: items.length,
            last_page: Math.max(1, Math.ceil(items.length / safePerPage)),
            totalPages: Math.max(1, Math.ceil(items.length / safePerPage)),
        },
    };
}

export async function getSettings() {
    const [settingsJson, logoJson] = await Promise.all([
        fetchJson("/api/v1/frontend/settings"),
        fetchJson("/api/v1/frontend/logo"),
    ]);

    return normalizeSettings(settingsJson?.data || [], logoJson?.data || {});
}

export async function getMenus() {
    const json = await fetchJson("/api/v1/frontend/menu");
    return (json?.data || []).map(normalizeMenuItem);
}

export async function getNews(perPage = 20) {
    const json = await fetchJson(`/api/v1/frontend/news?per_page=${perPage}`);
    return (json?.data || []).map(normalizeNewsItem);
}

export async function getSingleNews(slug) {
    const requestedSlug = decodeURIComponent(slug || "").trim();
    const normalizedRequestedSlug = toSlug(requestedSlug);
    const json = await fetchJson(`/api/v1/frontend/news/${encodeURIComponent(requestedSlug)}`);
    if (json?.data) {
        return normalizeNewsItem(json.data);
    }

    const fallbackList = await fetchJson("/api/v1/frontend/news?per_page=500");
    const matched = fallbackList?.data?.find((item) => {
        const itemSlug = decodeURIComponent(item?.slug || "").trim();
        return itemSlug === requestedSlug || toSlug(itemSlug) === normalizedRequestedSlug;
    });
    return matched ? normalizeNewsItem(matched) : {};
}

export async function getSinglePage(slug) {
    const settings = await getSettings();
    const content = settings.find((item) => item.meta_name === `${slug}_content` || item.meta_name === slug);

    return {
        description: typeof content?.meta_value === "string" ? content.meta_value : "",
    };
}

export async function getFeaturedNews() {
    const json = await fetchJson("/api/v1/frontend/news?featured=true&per_page=20");
    return (json?.data || []).map(normalizeNewsItem);
}

export async function getTrandingNews() {
    return getFeaturedNews();
}

export async function getLeadNews() {
    return getNewsByCat("lead-news", 10);
}

export async function getNewsByCat(slug, perPage = 20) {
    const json = await fetchJson(`/api/v1/frontend/news?category_slug=${encodeURIComponent(slug)}&per_page=${perPage}`);
    return (json?.data || []).map(normalizeNewsItem);
}

export async function getBreakingNews(perPage = 30) {
    const breaking = await getNewsByCat("breaking-news", perPage);
    if (breaking.length > 0) {
        return breaking;
    }

    const featured = await getFeaturedNews();
    if (featured.length > 0) {
        return featured.slice(0, perPage);
    }

    const latest = await getNews(perPage);
    return latest.slice(0, perPage);
}

export async function getMaxViewedNewsByCat(slug, perPage = 8) {
    const items = await getNewsByCat(slug, Math.max(perPage, 20));
    return [...items]
        .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
        .slice(0, perPage);
}

export async function getCategoryNews(slug, page = 1, perPage = 10) {
    const json = await fetchJson(`/api/v1/frontend/news?category_slug=${encodeURIComponent(slug)}&page=${page}&per_page=${perPage}`);

    return {
        success: Boolean(json?.success),
        data: (json?.data || []).map(normalizeNewsItem),
        meta: adaptMeta(json?.meta),
    };
}

export async function getFeaturedCategories() {
    const json = await fetchJson("/api/v1/frontend/categories");
    return (json?.data || []).map(normalizeCategory);
}

export async function getTrendingTags() {
    const menus = await getMenus();
    return menus
        .filter((item) => item?.slug && item?.name)
        .slice(0, 10)
        .map((item) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
        }));
}

export async function getVideoNews(page = 1, perPage = 12) {
    const json = await fetchJson("/api/v1/frontend/videos");
    const videos = (json?.data || []).map(normalizeVideoItem);
    return paginateArray(videos, page, perPage);
}

export async function getSingleVideoNews(slug) {
    const json = await fetchJson("/api/v1/frontend/videos");
    const videos = (json?.data || []).map(normalizeVideoItem);
    return videos.find((item) => item.slug === slug || item.id === slug) || {};
}

export async function searchNews(query) {
    if (!query?.trim()) {
        return [];
    }

    const json = await fetchJson(`/api/v1/frontend/news/search?q=${encodeURIComponent(query)}`);
    return (json?.data || []).map(normalizeNewsItem);
}

export async function getSingleCategories(slug) {
    const json = await fetchJson(`/api/v1/frontend/categories/${encodeURIComponent(slug)}`);
    return json?.data ? normalizeCategory(json.data) : {};
}

export async function getDivisions() {
    return [];
}

export async function getDistricts() {
    return [];
}

export async function getNewsByLocation(divisionId, districtId, page = 1, perPage = 10) {
    return paginateArray([], page, perPage);
}

export async function getTeamMembers() {
    const json = await fetchJson("/api/v1/frontend/team");
    return (json?.data || []).map((member) => ({
        id: member.id,
        name: member.name,
        designation: member.designation,
        image: member.image,
        section: member.section,
        isHead: member.isHead,
        order: member.order ?? 0,
    }));
}
