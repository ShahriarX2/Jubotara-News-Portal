const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const normalizeUrl = (value = "", fallbackProtocol = "https") => {
  const trimmed = trimTrailingSlash(String(value || "").trim());

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (
    /^(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(trimmed) ||
    /^\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?$/.test(trimmed)
  ) {
    return `http://${trimmed}`;
  }

  return `${fallbackProtocol}://${trimmed}`;
};

const DEFAULT_API_BASE_URL = "https://api.jubotaranews.com";

export const BASE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    DEFAULT_API_BASE_URL,
);

export const FRONT_END_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_FRONTEND_URL ||
    process.env.FRONT_END_URL ||
    "http://localhost:3000",
  "http",
);
