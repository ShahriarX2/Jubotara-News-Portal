# Frontend / API / Admin Split Plan

## Goal

Split the current system into three independent projects:

- `frontend`: public news website
- `api`: data, auth, media, and business logic
- `admin`: authenticated CMS and moderation UI

This document defines the current frontend dependencies, compares them to the new API repo, and recommends the migration path.

## Target Ownership

### Frontend owns

- public pages and routing
- SSR/ISR rendering
- UI components
- SEO rendering
- calling the public API only

### API owns

- authentication and authorization
- news content storage and retrieval
- categories
- team members
- videos
- navbar/menu configuration
- site settings
- logo/media metadata
- uploads

### Admin owns

- login session handling for editors/admins
- CRUD for content and configuration
- moderation and approval flows
- dashboards and user management

## Current Frontend Dependency Inventory

The frontend currently depends on these old CMS-style endpoints:

- `GET /api/v1/frontend/settings`
- `GET /api/v1/menus?menu=5`
- `GET /api/v1/posts`
- `GET /api/v1/post?slug=...`
- `GET /api/v1/categories`
- `GET /api/v1/category?slug=...`
- `GET /api/v1/locations/divisions`
- `GET /api/v1/locations/districts`
- `GET /api/v1/posts/by-location`

It also contains one direct hard-coded fetch outside the shared data layer:

- `GET https://admin.banglastar.com/api/v1/categories?taxonomy_type=designation...`
- `GET https://admin.banglastar.com/api/v1/post?slug=...`

Current frontend files using the old contract:

- [next.config.mjs](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/next.config.mjs)
- [utils/baseUrl.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/utils/baseUrl.js)
- [utils/axiosInstance.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/utils/axiosInstance.js)
- [lib/fetchData.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/lib/fetchData.js)
- [app/team/page.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/app/team/page.js)
- [components/home/LocationSearch.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/components/home/LocationSearch.js)

## New API Contract Today

The new API repo currently exposes these relevant routes:

- `GET /api/v1/news`
- `GET /api/v1/news/search`
- `GET /api/v1/news/:id`
- `GET /api/v1/category`
- `GET /api/v1/team`
- `GET /api/v1/video`
- `GET /api/v1/admin/navbar`
- `GET /api/v1/admin/settings`
- `GET /api/v1/settings/logo`

Relevant source:

- `api-temp/src/app.js`
- `api-temp/src/routes/*.js`

## Gap Analysis

### Already covered by the new API

- categories, in basic form: `GET /category`
- team members: `GET /team`
- videos: `GET /video`
- settings, but under a different path and shape: `GET /admin/settings`
- navbar/menu data, but under a different path and shape: `GET /admin/navbar`

### Not compatible with the current frontend yet

- news list endpoint shape does not match old `/posts`
- single news lookup uses `:id`, but frontend expects lookup by `slug`
- categories endpoint does not support `taxonomy_type`, `limit`, `is_featured`, ordering, or `slug` lookup in the old style
- settings path is different: frontend expects `/frontend/settings`
- menu path is different: frontend expects `/menus?menu=5`
- locations endpoints do not exist
- location-based news endpoint does not exist
- designation taxonomy for the team page does not exist

### Important model mismatch

The new API `News` model currently does not include a `slug` field, while the frontend depends heavily on slug-based routing and fetching.

Relevant source:

- `api-temp/src/models/news.model.js`

Without a stable `slug`, the public frontend cannot keep its current URL structure.

## Recommendation

Do not rewrite the frontend first.

The lower-risk path is:

1. Stabilize the API around a public frontend contract.
2. Keep admin on its own authenticated CRUD contract.
3. Refactor the frontend only after the API contract is ready.

That means the API should expose a **public read API** designed for the frontend, instead of forcing the frontend to consume admin-oriented or Mongo-id-oriented routes.

## Recommended Public API Contract

These routes should exist in the API repo for the frontend project:

### Site config

- `GET /api/v1/frontend/settings`
- `GET /api/v1/frontend/menu`
- `GET /api/v1/frontend/logo`

Suggested response shape:

```json
{
  "success": true,
  "data": {}
}
```

### News

- `GET /api/v1/frontend/news`
- `GET /api/v1/frontend/news/:slug`
- `GET /api/v1/frontend/news/search?q=...`
- `GET /api/v1/frontend/news/by-category/:slug`
- `GET /api/v1/frontend/news/by-location`
- `GET /api/v1/frontend/news/featured`
- `GET /api/v1/frontend/news/trending`
- `GET /api/v1/frontend/news/breaking`

Suggested query support:

- `page`
- `per_page`
- `category_slug`
- `division_id`
- `district_id`

### Categories and tags

- `GET /api/v1/frontend/categories`
- `GET /api/v1/frontend/categories/:slug`
- `GET /api/v1/frontend/tags/trending`
- `GET /api/v1/frontend/designations`

### Team and media

- `GET /api/v1/frontend/team`
- `GET /api/v1/frontend/videos`

### Locations

- `GET /api/v1/frontend/locations/divisions`
- `GET /api/v1/frontend/locations/districts?division_id=...`

## Fields the API Must Support

### News

Minimum frontend-safe fields:

- `_id`
- `slug`
- `headline`
- `content`
- `category`
- `categorySlug`
- `imageSrc`
- `imageCaption`
- `reporterInfo`
- `publishedAt`
- `isFeatured`
- `metaTitle`
- `metaDescription`
- `viewsCount`

### Category

- `_id`
- `name`
- `slug`
- `isFeatured`
- `order`
- `taxonomyType`

### Team member

- `_id`
- `name`
- `designation`
- `image`
- `section`
- `isHead`
- `order`

### Settings

Flattened key-value data is fine, but the keys must be documented and stable.

## Immediate API Changes Needed

These are the blockers before this frontend can be moved cleanly:

1. Add `slug` to the `News` model and ensure uniqueness.
2. Add public route to fetch a single news item by `slug`.
3. Add a public list route that supports the frontend filters now used in `lib/fetchData.js`.
4. Add public settings and menu endpoints that are not under `/admin/*`.
5. Add location endpoints, or remove location features from the frontend.
6. Decide whether `designation` is a real category taxonomy or should become part of the team API.
7. Document the public response shapes so frontend and admin stop depending on accidental backend structure.

## Frontend Refactor Plan After API Stabilization

### Phase 1

- replace hard-coded domain usage with `NEXT_PUBLIC_API_BASE_URL`
- remove direct dependency on `https://admin.banglastar.com`
- centralize all data calls in one frontend API client

### Phase 2

- replace old CMS endpoints in [lib/fetchData.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/lib/fetchData.js)
- remove special-case fetches in [app/team/page.js](E:/Work%20Files/News%20Portal/Jubotara-News-Portal/app/team/page.js)
- normalize all frontend data consumption to the new public API shape

### Phase 3

- remove the Next.js rewrite proxy if frontend and API are hosted separately
- use absolute API base URL via environment variable
- add graceful handling for missing/empty API data

## Decision

For this codebase, the recommended order is:

1. finish the public API contract in the API repo
2. update this frontend to use that contract
3. build or finish the admin project against the protected API routes

Trying to update the frontend before the API contract is complete will create rework.
