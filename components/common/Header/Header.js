
import Logo from './Logo';
import Navbar from './Navbar';
import Container from '../Container';
import HeaderActions from './HeaderActions';
import BreakingNews from '@/components/common/Header/BreakingNews';
import { getBreakingNews, getMenus, getSettings } from '@/lib/fetchData';
import { getMediaLinkByMetaName } from '@/utils/metaHelpers';

const Header = async () => {
    const [breakingNews, newsCategories, settings] = await Promise.all([
        getBreakingNews(),
        getMenus(),
        getSettings(),
    ]);
    const logoUrl = getMediaLinkByMetaName(settings, "site_logoimg_id");

    return (
        <header className="w-full sticky top-0 z-100 shadow-sm bg-white/95 backdrop-blur-md">
            <div className="text-black py-1 border-b border-gray-100">
                <Container className="flex items-center justify-between min-h-18 gap-4">
                    <div className="flex items-center gap-3 md:gap-6 min-w-0">
                        <Logo logoUrl={logoUrl} className="h-10 w-24 md:h-12 md:w-28" />
                        <Navbar news_categories={newsCategories} settings={settings} />
                    </div>
                    <HeaderActions />
                </Container>
            </div>
            <BreakingNews news={breakingNews} />
        </header>
    );
};

export default Header;
