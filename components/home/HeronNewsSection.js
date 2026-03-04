
import Link from 'next/link';
import Image from 'next/image';
import Container from '../common/Container';
import LocationSearch from './LocationSearch';
import { getTrandingNews } from '@/lib/fetchData';
import truncate from '@/utils/truncate';

const HeronNewsSection = async () => {

    const featuredNews = await getTrandingNews();
    const featuredNewsFirst = featuredNews[0];

    return (
        <Container className=" ">
            <div className='border-t border-slate-300 pb-3'>

            </div>
            {/* Top Featured Story */}
            <div className="px-2 md:px-3 lg:px-3 py-2 border-r-2 border-l-4 border-l-secondary border-gray-300 w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Text Side */}
                    <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-between ">
                        <div className=''>
                            <Link href={`/news/${featuredNewsFirst?.slug}`} className="group">
                                <h1 className="text-2xl md:text-3xl xl:text-5xl  text-gray-950 leading-[1.15]
                             group-hover:text-primary transition-colors">
                                    {featuredNewsFirst?.name}
                                </h1>
                            </Link>
                            <p className="text-gray-600  text-base md:text-2xl leading-relaxed mt-2 md:mt-3 ">

                                {truncate(featuredNewsFirst?.description)}
                            </p>
                            {/* <div className="flex items-center gap-4 text-sm text-gray-500 font-bold uppercase">
                            <span className="text-primary">{mainNews.category}</span>
                            <span>{mainNews.time}</span>
                        </div> */}
                        </div>
                        <div className="flex gap-2 pt-4 text-base md:text-xl">
                            <div className="px-3 py-1 bg-gray-200  font-bold text-gray-600">জাতীয়</div>
                            <div className="px-3 py-1 bg-gray-200  font-bold text-gray-600">রাজনীতি</div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="md:col-span-5 lg:col-span-5">
                        <Link href={`/news/${featuredNewsFirst?.slug}`} className="block relative h-[250px] md:h-full w-full overflow-hidden">
                            <Image
                                src={featuredNewsFirst?.featured_image}
                                alt={featuredNewsFirst?.name}
                                fill
                                priority
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* Search Side */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <LocationSearch />
                    </div>
                </div>
            </div>


        </Container>
    );
};

export default HeronNewsSection;
