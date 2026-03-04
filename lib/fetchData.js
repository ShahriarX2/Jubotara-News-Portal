import { BASE_URL } from "@/utils/baseUrl";


export async function getSettings() {
    const API_URL = `${BASE_URL}/api/v1/frontend/settings`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}

export async function getMenus() {
    const API_URL = `${BASE_URL}/api/v1/menus?menu=5`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}


export async function getNews(perPage = 20) {
    const API_URL = `${BASE_URL}/api/v1/posts?term_type=news&per_page=${perPage}`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}


export async function getSingleNews(slug) {
    const API_URL = `${BASE_URL}/api/v1/post?slug=${slug}`;

    // console.log("from action slug", slug)
    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    // console.log("from action", json)

    return json?.data || {};
}

export async function getFeaturedNews() {
    const API_URL = `${BASE_URL}/api/v1/posts?term_type=news&order_by=id:desc&is_featured=Yes`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}
export async function getTrandingNews() {
    const API_URL = `${BASE_URL}/api/v1/posts?term_type=news&order_by=id:desc&is_featured=Yes`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}



export async function getLeadNews() {
    const API_URL = `${BASE_URL}/api/v1/posts?term_type=news&per_page=10&order_by_id:desc&category_slug=lead-news`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}

export async function getNewsByCat(slug, perPage = 20) {
    const API_URL = `${BASE_URL}/api/v1/posts?term_type=news&category_slug=${slug}&per_page=${perPage}`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}

export async function getMaxViewedNewsByCat(slug, perPage = 8) {
    const API_URL = `${BASE_URL}/api/v1/posts?term_type=news&category_slug=${slug}&order_by=visitor_count:desc&per_page=${perPage}`;

    const res = await fetch(API_URL, {
        next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data || [];
}