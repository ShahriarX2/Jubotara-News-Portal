const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const DEFAULT_API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://jubotara-news-api.onrender.com";

export const BASE_URL = trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    DEFAULT_API_BASE_URL
);

export const FRONT_END_URL = trimTrailingSlash(
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    process.env.FRONT_END_URL ||
    "http://localhost:3000"
);
