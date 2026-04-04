import { NextResponse } from "next/server";

import { BASE_URL } from "@/utils/baseUrl";

/** True when `value` looks like a MongoDB ObjectId string (24 hex chars). */
function isMongoObjectIdString(value) {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
}

/**
 * Legacy URLs used numeric ids or MongoDB _id as the path segment.
 * Resolve to the canonical slug via HTTP redirect (no NEXT_REDIRECT throw in RSC).
 */
export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(/^\/news\/([^/]+)\/?$/);
  if (!match) {
    return NextResponse.next();
  }

  const segment = decodeURIComponent(match[1]);
  const looksLikeLegacyNewsId =
    /^\d+$/.test(segment) || isMongoObjectIdString(segment);

  if (!looksLikeLegacyNewsId) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/news/resolve-slug/${encodeURIComponent(segment)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data?.slug) {
        const url = request.nextUrl.clone();
        url.pathname = `/news/${data.slug}`;
        return NextResponse.redirect(url, 308);
      }
    }
  } catch {
    // Fall through: page may still 404 or handle the slug
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/news/:path*"],
};
