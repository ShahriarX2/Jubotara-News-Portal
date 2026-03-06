
import { mockNews, categories, videoNews, teamMembers } from './mockData';

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNews = async () => {
    await delay(500);
    return mockNews;
};

// export const getBreakingNews = async () => {
//     await delay(300);
//     return mockNews.filter(news => news.isBreaking);
// };

export const getTrendingNews = async () => {
    await delay(300);
    return mockNews.filter(news => news.isTrending);
};

export const getNewsBySlug = async (slug) => {
    console.log("slug", slug)
    await delay(400);
    return mockNews.find(news => news.slug === slug);
};

export const getCategories = async () => {
    await delay(200);
    return categories;
};

export const searchNews = async (query) => {
    await delay(500);
    if (!query) return [];
    const lowercaseQuery = query.toLowerCase();
    return mockNews.filter(news =>
        news.title.toLowerCase().includes(lowercaseQuery) ||
        news.summary.toLowerCase().includes(lowercaseQuery)
    );
};

export const getVideoNews = async () => {
    await delay(300);
    return videoNews;
};

export const getVideoNewsBySlug = async (slug) => {
    await delay(300);
    return videoNews.find(video => video.slug === slug);
};

export const getTeamMembers = async () => {
    await delay(300);
    return teamMembers;
};
