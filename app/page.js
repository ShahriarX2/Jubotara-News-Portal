import CountryWideSection from "@/components/home/CountryWideSection";
import SpecialCategorySection from "@/components/home/SpecialCategorySection";
import Container from "@/components/common/Container";
import PremiumCategoryBlock from "@/components/home/PremiumCategoryBlock";
import TrendingNewsSection from "@/components/home/TrendingNewsSection";
import ThumbnailNewsSection from "@/components/home/ThumbnailNewsSection";
import TrendingBar from "@/components/common/Header/TrendingBar";
import HeronNewsSection from "@/components/home/HeronNewsSection";
import VideoSection from "@/components/home/VideoSection";
import { getNewsByCat, getTrendingTags, getVideoNews } from "@/lib/fetchData";

const CATEGORY_SLUGS = {
  politics: "রাজনীতি",
  national: "জাতীয়",
  crime: "অপরাধ",
  lifestyle: "জীবনযাপন",
  sports: "খেলা",
  countrywide: "সারাদেশ",
  international: "আন্তর্জাতিক",
  entertainment: "বিনোদন",
  economy: "অর্থনীতি",
};

export default async function Home() {
  const [
    trendingTags,
    politicsNews,
    nationalNews,
    crimeNews,
    lifestyleNews,
    sportsNews,
    saraDeshNews,
    videoNewsResponse,
    internationalNews,
    entertainmentNews,
    economyNews,
  ] = await Promise.all([
    getTrendingTags(),
    getNewsByCat(CATEGORY_SLUGS.politics, 7),
    getNewsByCat(CATEGORY_SLUGS.national, 10),
    getNewsByCat(CATEGORY_SLUGS.crime, 10),
    getNewsByCat(CATEGORY_SLUGS.lifestyle, 10),
    getNewsByCat(CATEGORY_SLUGS.sports, 7),
    getNewsByCat(CATEGORY_SLUGS.countrywide, 7),
    getVideoNews(1, 4),
    getNewsByCat(CATEGORY_SLUGS.international, 10),
    getNewsByCat(CATEGORY_SLUGS.entertainment, 10),
    getNewsByCat(CATEGORY_SLUGS.economy, 10),
  ]);

  const politicsFirstNews = politicsNews[0];
  const politicsSideNews = politicsNews.slice(1, 7);
  const nationalFirstNews = nationalNews[0];
  const nationalSideNews = nationalNews.slice(1, 7);
  const saradeshFirstNews = saraDeshNews[0];
  const saradeshSideNews = saraDeshNews.slice(1, 7);
  const videoNews = videoNewsResponse?.data || [];

  return (
    <div className="min-h-screen">
      <Container>
        <div className="h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-bold text-gray-400 mt-2">
          ADVERTISEMENT
        </div>
      </Container>

      <TrendingBar trendingTags={trendingTags} />

      <main className="pb-12 space-y-4">
        <HeronNewsSection />
        <TrendingNewsSection />

        <ThumbnailNewsSection
          title="এক্সক্লুসিভ"
          news={lifestyleNews}
          slug={CATEGORY_SLUGS.lifestyle}
        />

        <SpecialCategorySection
          title="রাজনীতি"
          firstNews={politicsFirstNews}
          sideNews={politicsSideNews}
          slug={CATEGORY_SLUGS.politics}
        />

        <Container>
          <div
              className="h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-bold text-gray-400">
            {/*ADVERTISEMENT*/}
            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2919469073787343"
                    crossOrigin="anonymous"></script>
          </div>
        </Container>

        <CountryWideSection
            title="সারাদেশ"
            featureNews={saradeshFirstNews}
            gridNews={saradeshSideNews}
          slug={CATEGORY_SLUGS.countrywide}
        />

        <VideoSection videos={videoNews} />

        {nationalFirstNews && (
          <SpecialCategorySection
            title="জাতীয়"
            firstNews={nationalFirstNews}
            sideNews={nationalSideNews}
            slug={CATEGORY_SLUGS.national}
          />
        )}

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 xl:gap-6">
            <PremiumCategoryBlock
              title="আন্তর্জাতিক"
              news={internationalNews}
              slug={CATEGORY_SLUGS.international}
            />
            <PremiumCategoryBlock
              title="খেলাধুলা"
              news={sportsNews}
              slug={CATEGORY_SLUGS.sports}
            />
          </div>
        </Container>

        <Container>
          <div className="h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-bold text-gray-400">
            ADVERTISEMENT
          </div>
        </Container>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PremiumCategoryBlock
              title="অপরাধ"
              news={crimeNews}
              vertical={true}
              slug={CATEGORY_SLUGS.crime}
            />
            <PremiumCategoryBlock
              title="বিনোদন"
              news={entertainmentNews}
              vertical={true}
              slug={CATEGORY_SLUGS.entertainment}
            />
            <PremiumCategoryBlock
              title="অর্থনীতি"
              news={economyNews}
              vertical={true}
              slug={CATEGORY_SLUGS.economy}
            />
          </div>
        </Container>
      </main>
    </div>
  );
}
