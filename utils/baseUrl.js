const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

export const BASE_URL = trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    "http://localhost:5000"
);

export const FRONT_END_URL = trimTrailingSlash(
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    process.env.FRONT_END_URL ||
    "http://localhost:3000"
);
