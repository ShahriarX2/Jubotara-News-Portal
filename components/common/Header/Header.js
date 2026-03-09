
import Logo from './Logo';
import Navbar from './Navbar';
import Container from '../Container';
import HeaderActions from './HeaderActions';
import BreakingNews from '@/components/common/Header/BreakingNews';
import { getBreakingNews, getFeaturedCategories, getSettings } from '@/lib/fetchData';
import { getImageUrl, getMediaLinkByMetaName } from '@/utils/metaHelpers';
import Link from 'next/link';

const Header = async () => {
    const breakingNews = await getBreakingNews();
    const news_categories = await getFeaturedCategories()
    const settings = await getSettings()

    const logo = getMediaLinkByMetaName(settings, "site_logoimg_id");
    const logoUrl = getImageUrl(logo)
    // console.log("logo", logo)

    return (
        <header className="w-full sticky top-0 z-50 ">
            {/* Top Thick Red Bar (Matching Fox style) */}


            {/* Main Section with Logo and Nav items */}
            <div className="bg-secondary text-white py-0">
                <Container className="flex items-center justify-between min-h-[50px] relative">
                    <div className="flex items-start ">
                        {/* Logo Container - Absolute Positioned to Overlap */}
                        <div className="absolute md:top-[9px] left-0 md:left-6 z-[70]">
                            <Logo logoUrl={logoUrl} />

                        </div>
                        <div className=' md:hidden bg-secondary '>
                            <Link
                                href="/"
                                className='font-bold text-base ml-1'>Bangla Star</Link>
                        </div>

                        {/* Empty spacer for the logo on desktop */}
                        <div className="w-[120px] lg:w-[100px] hidden md:block"></div>

                        {/* Navigation Items (Managed by Navbar now) */}
                        <Navbar news_categories={news_categories} settings={settings} />
                    </div>
                    <HeaderActions />

                </Container>
            </div>

            {/* Row 2 Breakeing news */}
            <BreakingNews news={breakingNews} />
            {/* <TrendingBar /> */}
        </header>
    );
};

export default Header;
