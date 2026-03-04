
// import Header from '@/components/common/Header/Header';
// import Footer from '@/components/common/Footer';
// import BreakingNews from '@/components/common/Header/BreakingNews';
// import { getNews, getBreakingNews, getCategories } from '@/lib/api';
// import Container from '@/components/common/Container';
// import Link from 'next/link';
// import Image from 'next/image';

// export async function generateMetadata({ params }) {
//     const { slug } = await params;
//     const categories = await getCategories();
//     const category = categories.find(c => c.slug === slug);
//     return {
//         title: `${category ? category.name : 'বিভাগ'} | বাংলা স্টার নিউজ`,
//     };
// }

// export default async function CategoryPage({ params }) {
//     const { slug } = await params;
//     const categories = await getCategories();
//     const category = categories.find(c => c.slug === slug);
//     const breakingNews = await getBreakingNews();
//     const allNews = await getNews();

//     // Filter news by category name (mock)
//     const categoryNews = allNews.filter(n =>
//         n.category.toLowerCase() === (category ? category.name.toLowerCase() : '') ||
//         (slug === 'national' && n.category === 'জাতীয়') ||
//         (slug === 'politics' && n.category === 'রাজনীতি') ||
//         (slug === 'international' && n.category === 'আন্তর্জাতিক') ||
//         (slug === 'sports' && n.category === 'খেলা') ||
//         (slug === 'entertainment' && n.category === 'বিনোদন') ||
//         (slug === 'lifestyle' && n.category === 'লাইফস্টাইল') ||
//         (slug === 'technology' && n.category === 'তথ্যপ্রযুক্তি') ||
//         (slug === 'economics' && n.category === 'অর্থনীতি')
//     );

//     const featuredNews = categoryNews[0];
//     const otherNews = categoryNews.slice(1);
//     const latestNews = allNews.slice(0, 5); // Just some latest news for sidebar

//     const subCategories = [
//         "করোনাভাইরাস", "রাজধানীর খবর", "জাতীয় সংসদ", "চট্টগ্রামের খবর", "ওসমান হাদি",
//         "প্রধান উপদেষ্টা", "ভারতীয় হাইকমিসন", "প্রথম আলো", "ডেইলি স্টার"
//     ];

//     return (
//         <div className="flex flex-col min-h-screen bg-[#eff3f6]">



//             <main className="py-6">
//                 <Container>
//                     <div className="flex flex-col lg:flex-row gap-2 md:gap-6">

//                         <div className="lg:w-3/4">
//                             {/* Category Title */}
//                             <div className="mb-4">
//                                 <div className="flex items-center gap-4  mb-4">
//                                     <h1 className="text-3xl font-bold text-[#003366]">
//                                         {category ? category.name : 'বিভাগ'}
//                                     </h1>
//                                     <div className="flex-1 border-t border-gray-300 mt-2"></div>
//                                 </div>

//                                 {/* Sub-categories Bar */}
//                                 <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
//                                     {subCategories.map((sub, i) => (
//                                         <button key={i} className="whitespace-nowrap px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-medium border border-gray-300 transition-colors">
//                                             {sub}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="flex flex-col lg:flex-row gap-4">
//                                 {/* Main Content */}
//                                 <div >
//                                     {featuredNews && (
//                                         <div className="mb-2 md:mb-4 border-b border-gray-300 pb-2 md:pb-4">
//                                             <Link href={`/news/${featuredNews.slug}`} className="flex flex-col md:flex-row gap-4">
//                                                 <div className="md:w-1/2">
//                                                     <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight hover:text-red-600 transition-colors mb-4">
//                                                         {featuredNews.title}
//                                                     </h2>
//                                                     <p className="text-gray-600 text-base md:text-xl line-clamp-3">
//                                                         {featuredNews.summary}
//                                                     </p>
//                                                 </div>
//                                                 <div className="md:w-1/2 relative h-[250px] md:h-auto min-h-[300px]">
//                                                     <Image
//                                                         src={featuredNews.image}
//                                                         alt={featuredNews.title}
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                 </div>
//                                             </Link>
//                                         </div>
//                                     )}

//                                     {/* News Grid */}
//                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
//                                         {otherNews.map((news) => (
//                                             <Link key={news.id} href={`/news/${news.slug}`} className="flex gap-3 group border border-gray-300 p-2 hover:bg-[#eff3f6] transition-colors">
//                                                 <div className="flex-1">
//                                                     <h3 className="text-base md:text-xl font-bold text-gray-800 leading-snug group-hover:text-red-600
//                                                     transition-colors line-clamp-1">
//                                                         {news.title}
//                                                     </h3>
//                                                     <p className="text-base md:text-xl text-gray-500 mt-2 line-clamp-2">
//                                                         {news.summary}
//                                                     </p>
//                                                 </div>
//                                                 <div className="relative w-20 h-20 flex-shrink-0">
//                                                     <Image
//                                                         src={news.image}
//                                                         alt={news.title}
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                 </div>
//                                             </Link>
//                                         ))}
//                                     </div>

//                                     {/* Show More Button */}
//                                     <div className="mt-4 md:mt-6 flex justify-center">
//                                         <button className="bg-red-700 text-base md:text-xl text-white px-4 py-1 md:px-8 md:py-2 rounded font-bold hover:bg-red-800 transition-colors">
//                                             আরও দেখুন
//                                         </button>
//                                     </div>
//                                 </div>


//                             </div>
//                         </div>
//                         <div className="lg:w-1/4">
//                             <div className="sticky">
//                                 <h2 className="text-xl font-bold text-red-600 border-b-2 border-red-600 pb-1 mb-4">
//                                     সর্বশেষ
//                                 </h2>
//                                 <div className="flex flex-col gap-2 md:gap-4">
//                                     {latestNews.map((news) => (
//                                         <Link key={news.id} href={`/news/${news.slug}`} className="flex gap-3 group border-b pb-4 last:border-0">
//                                             <div className="flex-1">
//                                                 <h4 className="text-base md:text-xl font-bold text-gray-800 leading-tight group-hover:text-red-600
//                                                  transition-colors line-clamp-2">
//                                                     {news.title}
//                                                 </h4>
//                                                 <p className="text-base md:text-xl text-gray-500 mt-1 line-clamp-1">
//                                                     {news.summary}
//                                                 </p>
//                                             </div>
//                                             <div className="relative w-20 h-20 flex-shrink-0">
//                                                 <Image
//                                                     src={news.image}
//                                                     alt={news.title}
//                                                     fill
//                                                     className="object-cover"
//                                                 />
//                                             </div>
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Container>
//             </main>


//         </div>
//     );
// }
