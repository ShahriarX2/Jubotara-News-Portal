import Container from "@/components/common/Container";
import {
  getCategoryNews,
  getMenus,
  getNews,
  getSingleCategories,
} from "@/lib/fetchData";
import { FRONT_END_URL } from "@/utils/baseUrl";
import truncate from "@/utils/truncate";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const decodeSlug = (value = "") => {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return String(value).trim();
  }
};

const toBanglaNumber = (value) =>
  String(value)
    .split("")
    .map((digit) => BANGLA_DIGITS[Number(digit)] ?? digit)
    .join("");

const resolveCategoryName = (slug, category, menus, categoryNews = []) => {
  const decodedSlug = decodeSlug(slug);

  const menuMatch = menus.find((item) => {
    const hrefSlug = item?.href?.replace("/category/", "");
    return item?.slug === decodedSlug || item?.link === decodedSlug || hrefSlug === decodedSlug;
  });

  const newsMatch = categoryNews[0]?.categories?.find((item) => item?.slug === decodedSlug);

  return (
    category?.name ||
    menuMatch?.label ||
    menuMatch?.name ||
    newsMatch?.name ||
    decodedSlug ||
    "বিভাগ"
  );
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeSlug(slug);

  const [category, menus] = await Promise.all([
    getSingleCategories(decodedSlug),
    getMenus(),
  ]);

  const categoryName = resolveCategoryName(decodedSlug, category, menus);
  const title = `${categoryName} | যুবতারা নিউজ`;
  const description = `${categoryName} বিভাগের সর্বশেষ সংবাদ, ব্রেকিং নিউজ এবং বিশেষ প্রতিবেদন দেখুন যুবতারা নিউজে।`;
  const pageUrl = `${FRONT_END_URL}/category/${encodeURIComponent(decodedSlug)}`;

  return {
    title,
    description,
    metadataBase: new URL(FRONT_END_URL),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "যুবতারা নিউজ",
      locale: "bn_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@jubotaranews",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const revalidate = 300;

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const decodedSlug = decodeSlug(slug);
  const resolvedSearchParams = await searchParams;
  const currentPage = Number.parseInt(resolvedSearchParams.page, 10) || 1;
  const perPage = 10;

  const [category, menus, newsResponse, allNews] = await Promise.all([
    getSingleCategories(decodedSlug),
    getMenus(),
    getCategoryNews(decodedSlug, currentPage, perPage),
    getNews(15),
  ]);

  const categoryNews = newsResponse?.data || [];
  const latestNews = allNews.slice(0, 7);
  const categoryName = resolveCategoryName(decodedSlug, category, menus, categoryNews);
  const totalPages = newsResponse?.meta?.last_page || 1;
  const featuredNews = categoryNews[0];
  const otherNews = categoryNews.slice(1);
  const subCategories = category?.child || [];
  const hasKnownCategory =
    Boolean(category?.id) ||
    menus.some((item) => {
      const hrefSlug = item?.href?.replace("/category/", "");
      return item?.slug === decodedSlug || item?.link === decodedSlug || hrefSlug === decodedSlug;
    });

  if (!hasKnownCategory && categoryNews.length === 0) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: FRONT_END_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `${FRONT_END_URL}/category/${encodeURIComponent(decodedSlug)}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#eff3f6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-2 py-6">
        <Container>
          <div className="flex flex-col gap-2 md:gap-6 lg:flex-row">
            <div className="lg:w-3/4">
              <div className="mb-4">
                <div className="mb-4 flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-[#003366]">{categoryName}</h1>
                  <div className="mt-2 flex-1 border-t border-gray-300"></div>
                </div>

                {subCategories.length > 0 && (
                  <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
                    {subCategories.map((sub) => (
                      <Link
                        href={`/category/${sub.slug}`}
                        key={sub.slug}
                        className="whitespace-nowrap border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-200 md:text-base"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="w-full">
                  {featuredNews ? (
                    <div className="mb-2 border-b border-gray-300 pb-2 md:mb-4 md:pb-4">
                      <Link href={`/news/${featuredNews.slug}`} className="flex flex-col gap-4 md:flex-row">
                        <div className="md:w-1/2">
                          <h2 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 transition-colors hover:text-red-600 md:text-4xl">
                            {featuredNews.name}
                          </h2>
                          <p className="line-clamp-3 text-base text-gray-600 md:text-xl lg:line-clamp-6">
                            {truncate(featuredNews.description, 1000)}
                          </p>
                        </div>
                        <div className="relative min-h-[250px] h-[250px] md:min-h-[300px] md:w-1/2 md:h-auto">
                          <Image
                            src={featuredNews.featured_image}
                            alt={featuredNews.name}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-md object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <p className="py-10 text-center text-sm md:text-base">No News Found</p>
                  )}

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
                    {otherNews.map((news) => (
                      <Link
                        key={news.id}
                        href={`/news/${news.slug}`}
                        className="group flex gap-3 rounded-lg border border-gray-300 p-3 shadow-sm transition-colors hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-800 transition-colors group-hover:text-red-600 md:text-xl">
                            {news.name}
                          </h3>
                          <p className="line-clamp-1 text-base text-gray-600 md:text-xl">
                            {truncate(news.description)}
                          </p>
                        </div>
                        <div className="relative h-24 w-24 shrink-0">
                          <Image
                            src={news.featured_image}
                            alt={news.name}
                            fill
                            sizes="96px"
                            className="rounded-md object-cover"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {otherNews.length > 0 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      {currentPage > 1 && (
                        <Link
                          href={`/category/${encodeURIComponent(decodedSlug)}?page=${currentPage - 1}`}
                          className="rounded border border-gray-300 bg-white px-4 py-2 font-bold text-[#003366] hover:bg-gray-100"
                        >
                          পূর্ববর্তী
                        </Link>
                      )}

                      <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;

                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                          ) {
                            return (
                              <Link
                                key={pageNumber}
                                href={`/category/${encodeURIComponent(decodedSlug)}?page=${pageNumber}`}
                                className={`flex h-10 w-10 items-center justify-center rounded border text-base font-bold md:text-xl ${
                                  currentPage === pageNumber
                                    ? "border-red-700 bg-red-700 text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {toBanglaNumber(pageNumber)}
                              </Link>
                            );
                          }

                          if (
                            (pageNumber === currentPage - 3 && pageNumber > 1) ||
                            (pageNumber === currentPage + 3 && pageNumber < totalPages)
                          ) {
                            return (
                              <span key={pageNumber} className="px-2">
                                ...
                              </span>
                            );
                          }

                          return null;
                        })}
                      </div>

                      {currentPage < totalPages && (
                        <Link
                          href={`/category/${encodeURIComponent(decodedSlug)}?page=${currentPage + 1}`}
                          className="rounded border border-gray-300 bg-white px-4 py-2 font-bold text-[#003366] hover:bg-gray-100"
                        >
                          পরবর্তী
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-1/4">
              <div className="sticky top-6">
                <h2 className="mb-4 border-b-2 border-red-600 pb-1 text-xl font-bold text-red-600">
                  সর্বশেষ
                </h2>
                <div className="flex flex-col gap-4">
                  {latestNews.map((news) => (
                    <Link
                      key={news.id}
                      href={`/news/${news.slug}`}
                      className="group flex gap-3 border-b border-gray-200 pb-4 last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="line-clamp-2 text-base font-bold leading-tight text-gray-800 transition-colors group-hover:text-red-600 md:text-xl">
                          {news.name}
                        </h4>
                        <p className="mt-1 line-clamp-1 text-base text-gray-500 md:text-xl">
                          {truncate(news.description)}
                        </p>
                      </div>
                      <div className="relative h-16 w-16 shrink-0">
                        <Image
                          src={news.featured_image || news.image}
                          alt={news.name || "news image"}
                          fill
                          sizes="64px"
                          className="rounded object-cover shadow-sm"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
