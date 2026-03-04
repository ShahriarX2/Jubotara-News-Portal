
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer';
import CountryWideSection from '@/components/home/CountryWideSection';
import SpecialCategorySection from '@/components/home/SpecialCategorySection';
import { getNews, getBreakingNews, getTrendingNews, getVideoNews } from '@/lib/api';
import Container from '@/components/common/Container';
import PremiumCategoryBlock from '@/components/home/PremiumCategoryBlock';
import TrendingNewsSection from '@/components/home/TrendingNewsSection';
import ThumbnailNewsSection from '@/components/home/ThumbnailNewsSection';
import TrendingBar from '@/components/common/Header/TrendingBar';
import HeronNewsSection from '@/components/home/HeronNewsSection';
import VideoSection from '@/components/home/VideoSection';
import { getNewsByCat } from '@/lib/fetchData';

export default async function Home() {

  const politicsNews = await getNewsByCat("politics", 20)
  const politicsFirstNews = politicsNews[0];
  const politicsSideNews = politicsNews.slice(1, 7)

  const nationalNews = await getNewsByCat("national", 20)
  const crimeNews = await getNewsByCat("অপরাধ", 20);

  const lifestyleNews = await getNewsByCat("lifestyle", 20)


  const sportsNews = await getNewsByCat("sports", 20)
  const sortsFirstNews = sportsNews[0];
  const sportsSideNews = sportsNews.slice(1, 7)


  const saraDeshNews = await getNewsByCat("town_village", 9)
  const saradeshFirstNews = saraDeshNews[0];
  const saradeshSideNews = saraDeshNews.slice(1, 7)
  // console.log("saraDeshNews", saraDeshNews)

  const trendingNews = await getTrendingNews();
  const videoNews = await getVideoNews();

  const internationalNews = await getNewsByCat("international", 20)
  const entertainmentNews = await getNewsByCat("entertainment", 20)
  const economyNews = await getNewsByCat("economy", 20)




  return (
    <div className=" min-h-screen bg-[#eff3f6]">

      {/* Ad Space  */}
      <Container >
        <div className=" h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-bold text-gray-400">
          ADVERTISEMENT
        </div>

      </Container>
      <TrendingBar />


      <main className="pb-12 space-y-4">
        {/* Dynamic Hero Row matching reference */}
        <HeronNewsSection />
        <TrendingNewsSection />
        <ThumbnailNewsSection
          title={"এক্সক্লুসিভ"}
          news={lifestyleNews}
          slug={'lifestyle'}
        />
        {/* Politics Section */}
        <SpecialCategorySection
          title="রাজনীতি"
          firstNews={politicsFirstNews}
          sideNews={politicsSideNews}
          slug={'politics'}
        />
        {/* Ad Space  */}
        <Container >
          <div className=" h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-bold text-gray-400">
            ADVERTISEMENT
          </div>

        </Container>
        {/* Country Wide Section */}
        <CountryWideSection
          title="সারাদেশ"
          featureNews={saradeshFirstNews}
          gridNews={saradeshSideNews}
          slug={'town_village'}
        />

        {/* Video News Section */}
        <VideoSection videos={videoNews} />

        {/* Sports Section */}
        <SpecialCategorySection
          title="খেলাধুলা"
          firstNews={sortsFirstNews}
          sideNews={sportsSideNews}
          slug={'sports'}

        />



        {/* Categories Section */}
        <Container className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 xl:gap-6">
            <PremiumCategoryBlock title="জাতীয়" news={nationalNews} slug={'national'} />
            <PremiumCategoryBlock title="আন্তর্জাতিক" news={internationalNews} slug={'international'} />
          </div>
        </Container>


        {/* Ad Space  */}
        <Container >
          <div className=" h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center font-bold text-gray-400">
            ADVERTISEMENT
          </div>

        </Container>

        <Container className="">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PremiumCategoryBlock title="অপরাধ" news={crimeNews} vertical={true} slug={'অপরাধ'} />
            <PremiumCategoryBlock title="বিনোদন" news={entertainmentNews} vertical={true} slug={'entertainment'} />
            <PremiumCategoryBlock title="অর্থনীতি" news={economyNews} vertical={true} slug={'economy'} />
          </div>
        </Container>
      </main>


    </div>
  );
}

