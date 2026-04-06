import Container from "@/components/common/Container";
import ThumbnailNewsSection from "@/components/home/ThumbnailNewsSection";
import HorizontalCard from "@/components/news/HorizontalCard";
import NewsPrintTemplate from "@/components/news/NewsPrintTemplate";
import PrintButton from "@/components/news/PrintButton";
import ShareButtons from "@/components/news/ShareButtons";
import {
  getRelatedNews,
  getSingleNews,
  getTrandingNews,
} from "@/lib/fetchData";
import { FRONT_END_URL } from "@/utils/baseUrl";
import { formatBengaliDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGoogle, FaWhatsapp } from "react-icons/fa";

const DEFAULT_AUTHOR = "নিজস্ব প্রতিবেদক";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const news = await getSingleNews(slug);

  if (!news || Object.keys(news).length === 0) {
    return {
      title: "সংবাদ পাওয়া যায়নি | যুবতারা নিউজ",
    };
  }

  const newsTitle = news?.meta_title || news?.name || news?.title;
  const title = `${newsTitle} | যুবতারা নিউজ`;
  const plainDescription = (
    news.meta_description ||
    news.summary ||
    news.description ||
    ""
  )
    .replace(/<[^>]*>/g, "")
    .split("\n")[0]
    .slice(0, 160)
    .trim();
  const imageUrl = news?.featured_image || "";
  const postUrl = `${FRONT_END_URL}/news/${slug}`;
  const categoryName = news?.categories?.[0]?.name || "সংবাদ";

  return {
    title,
    description: plainDescription,
    metadataBase: new URL(FRONT_END_URL),
    keywords: [
      categoryName,
      "বাংলাদেশ সংবাদ",
      "যুবতারা নিউজ",
      "Jubotara News",
      "সর্বশেষ খবর",
      ...newsTitle.split(" "),
    ].slice(0, 15),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description: plainDescription,
      url: postUrl,
      siteName: "যুবতারা নিউজ",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: newsTitle,
            },
          ]
        : [],
      locale: "bn_BD",
      type: "article",
      publishedTime: news?.created_at,
      authors: [DEFAULT_AUTHOR],
      section: categoryName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: plainDescription,
      images: imageUrl ? [imageUrl] : [],
      site: "@jubotaranews",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: categoryName,
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;

  // Get current URL for sharing
  const fullUrl = `${FRONT_END_URL}/news/${slug}`;

  const [trendingNews, news, relatedNews ] = await Promise.all([
    getTrandingNews(),
    getSingleNews(slug),
    getRelatedNews(slug),
  ]);

  console.log(relatedNews);

  if (!news || Object.keys(news).length === 0) {
    notFound();
  }

  const category = news.categories?.[0];
  const articleContent = news.description;
  const googleNewsUrl = "#"; // @TODO: Add the actual Google News URL later
  const whatsappChannelUrl =
    "https://whatsapp.com/channel/0029Vb7PrGXEQIauQ2oDIe2G";

  const formattedPublishedDate = formatBengaliDate(news?.created_at);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.name || news.title,
    image: [news.featured_image || ""],
    datePublished: news.created_at,
    dateModified: news.updated_at || news.created_at,
    author: [
      {
        "@type": "Person",
        name: DEFAULT_AUTHOR,
        url: FRONT_END_URL,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "যুবতারা নিউজ",
      logo: {
        "@type": "ImageObject",
        url: `${FRONT_END_URL}/logo.png`,
      },
    },
    description:
      news.summary ||
      news.description
        ?.replace(/<[^>]*>/g, "")
        .slice(0, 160)
        .trim(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };

  return (
    <>
      <NewsPrintTemplate news={news} category={category} />

      <div className="flex min-h-screen flex-col bg-[#eff3f6] print:hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <main className="py-2">
          <Container className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <article className="lg:col-span-9 border border-slate-300 bg-white p-3 md:p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-base md:text-xl">
                  <span className="bg-primary px-3 py-1 font-bold text-white">
                    {category?.name}
                  </span>
                </div>

                <h1 className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
                  {news?.name}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-base font-bold text-gray-800 md:text-xl">
                        {news?.author?.full_name || DEFAULT_AUTHOR}
                      </p>
                      <span className="text-base font-medium text-gray-600 md:text-lg">
                        {formattedPublishedDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShareButtons
                      title={news?.name || news?.title}
                      url={fullUrl}
                    />
                    <PrintButton />
                  </div>
                </div>

                <div className="relative h-75 w-full overflow-hidden shadow-inner md:h-125">
                  <Image
                    src={news?.featured_image}
                    alt={news?.name || "news image"}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className="article-content text-gray-800 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: articleContent }}
                ></div>

                {news.tags && news.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {news.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-10 border-t border-slate-300 pt-10">
                <div className="rounded-sm bg-linear-to-r from-blue-50 to-gray-50 p-6 shadow-sm md:p-8">
                  <h3 className="mb-6 text-lg font-semibold text-gray-800 md:text-2xl">
                    আপডেটেড খবর পেতে আমাদের সাথে যুক্ত থাকুন
                  </h3>

                  <div className="flex flex-col gap-4 md:flex-row">
                    <Link
                      href={googleNewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-slate-300 bg-white px-5 py-4 transition-all duration-300 hover:bg-blue-50 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-700 transition group-hover:scale-110">
                        <FaGoogle />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          গুগল নিউজ চ্যানেল
                        </p>
                        <p className="text-sm text-gray-500">
                          ফলো করুন সর্বশেষ আপডেট পেতে
                        </p>
                      </div>
                    </Link>

                    <Link
                      href={whatsappChannelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-slate-300 bg-white px-5 py-4 transition-all duration-300 hover:bg-green-50 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-600 transition group-hover:scale-110">
                        <FaWhatsapp />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          হোয়াটসঅ্যাপ চ্যানেল
                        </p>
                        <p className="text-sm text-gray-500">
                          সরাসরি নোটিফিকেশন পেতে যুক্ত থাকুন
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <aside className="space-y-6 lg:col-span-3">
              <div className="flex h-64 items-center justify-center border-2 border-dashed border-slate-300 bg-gray-100">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  বিজ্ঞাপন / Advertisement
                </span>
              </div>

              <div className="border border-slate-300 bg-white p-3 md:p-6">
                <h2 className="mb-6 flex items-center gap-2 border-b-2 border-primary pb-2 text-xl font-bold">
                  <span className="inline-block h-6 w-2 bg-primary"></span>
                  ট্রেন্ডিং সংবাদ
                </h2>
                <div className="space-y-2">
                  {trendingNews?.slice(0, 11)?.map((item) => (
                    <HorizontalCard key={item.id} news={item} />
                  ))}
                </div>
              </div>
            </aside>
          </Container>
        </main>

        <ThumbnailNewsSection
          title="আরও খবর"
          news={relatedNews}
          slug={category?.slug || category?.name}
        />
      </div>
    </>
  );
}
