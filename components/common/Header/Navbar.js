

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';




const Navbar = ({ news_categories, settings }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className="relative">
            {/* Desktop Navbar */}
            <div className="hidden lg:flex items-center ">
                <ul className="flex items-start">
                    {news_categories?.map((item) => (
                        <li key={item?.id} className="relative group">
                            <Link
                                href={`/category/${item?.slug}`}
                                className={`px-3 py-4 block text-[13px] sm:text-sm md:text-xl font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1 ${pathname === `/category/${item.slug}`
                                    ? 'text-white underline decoration-2 underline-offset-8'
                                    : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {item?.name}
                                {item?.child?.length > 0 && (
                                    <svg className="w-4 h-4 fill-current opacity-70 group-hover:rotate-180 transition-transform duration-200" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                )}
                            </Link>

                            {/* Desktop Dropdown */}
                            {item?.child?.length > 0 && (
                                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md border
                                 border-gray-100 min-w-[220px]
                                 z-[110] py-2 rounded-b-md transform origin-top animate-in fade-in zoom-in-95 duration-200">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-20"></div>
                                    {item.child.map((subItem) => (
                                        <Link
                                            key={subItem.id}
                                            href={`/category/${subItem.slug}`}
                                            className="block px-5 py-2.5 text-base md:text-lg text-gray-700 hover:bg-gray-50 hover:text-red-600
                                             font-bold transition-all border-b border-gray-50 last:border-0"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                    <li className="relative group">
                        <Link
                            href={`/video`}
                            className={`px-3 py-4 block text-[13px] sm:text-sm md:text-xl font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1 ${pathname === "/video"
                                ? 'text-white underline decoration-2 underline-offset-8'
                                : 'text-white/90 hover:text-white'
                                }`}
                        >
                            ভিডিও

                        </Link>
                    </li>

                </ul>
            </div>

           
        </nav>
    );
};

export default Navbar;

