import Image from 'next/image';

import { FRONT_END_URL } from '@/utils/baseUrl';
import { formatBengaliDate } from '@/utils/formatDate';

/** Remote hosts allowed in next.config images.remotePatterns; others use unoptimized. */
function imageSrcNeedsUnoptimized(src) {
    if (!src || typeof src !== 'string') return true;
    if (src.startsWith('/')) return false;
    try {
        const { hostname } = new URL(src);
        return hostname !== 'res.cloudinary.com' && hostname !== 'img.youtube.com';
    } catch {
        return true;
    }
}

const NewsPrintTemplate = ({ news, category }) => {
    const formattedPublishedDate = formatBengaliDate(news?.created_at);
    const featuredSrc = news?.featured_image || '/images/img_avatar.png';

    return (
        <div className="hidden print:block w-full text-black p-4 min-h-screen">
            <div className="flex flex-col items-center justify-center border-b-2 border-red-600 pb-6 mb-8 text-center">
                <Image
                    src="/images/logo.png"
                    alt="Jubotara News"
                    width={200}
                    height={64}
                    className="h-16 w-auto mb-2 object-contain"
                />
                <p className="text-sm font-bold text-gray-700">উন্মোচনের লক্ষে, সত্যের পক্ষে</p>
                <p className="text-xs text-gray-500 lowercase">www.jubotaranews.com</p>
            </div>

            <h1 className="text-3xl font-bold mb-4 leading-tight">{news?.name}</h1>

            <div className="flex items-center justify-between border-y border-gray-300 py-3 mb-6">
                <div>
                    <span className="font-bold text-gray-800">
                        {news?.author?.full_name || 'নিজস্ব প্রতিবেদক'}
                    </span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-gray-600">{category?.name}</span>
                </div>
                <div className="text-gray-600">{formattedPublishedDate}</div>
            </div>

            <div className="mb-8">
                <Image
                    src={featuredSrc}
                    alt={news?.name || ''}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover rounded-none"
                    style={{ maxHeight: '450px' }}
                    unoptimized={imageSrcNeedsUnoptimized(featuredSrc)}
                />
            </div>

            <div className="news-content-print">
                <div
                    className="text-lg leading-relaxed text-gray-900"
                    dangerouslySetInnerHTML={{
                        __html: news.description || '<p>No content available.</p>',
                    }}
                ></div>
            </div>

            <div className="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-500 text-right">
                মুদ্রিত হয়েছে:{' '}
                {new Date().toLocaleDateString('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
        </div>
    );
};

export default NewsPrintTemplate;
