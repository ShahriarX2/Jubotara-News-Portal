

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


const navItems = [
    { id: 1, name: "হোম", slug: "/" },
    { id: 2, name: "জাতীয়", slug: "/category/national" },
    { id: 3, name: "রাজনীতি", slug: "/category/politics" },
    { id: 4, name: "আন্তর্জাতিক", slug: "/category/international" },
    { id: 5, name: "খেলা", slug: "/category/sports" },
    { id: 6, name: "বিনোদন", slug: "/category/entertainment" },
    { id: 7, name: "জীবনযাপন", slug: "/category/lifestyle" },
    { id: 8, name: "প্রযুক্তি", slug: "/category/technology" },
    { id: 9, name: "অর্থনীতি", slug: "/category/economics" },
    { id: 10, name: "ভিডিও", slug: "/video" },
];


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
                                className={`px-3 py-4 block text-[13px] sm:text-sm md:text-xl font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1 ${pathname === item.slug
                                    ? 'text-white underline decoration-2 underline-offset-8'
                                    : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {item?.name}
                                {/* <svg className="w-2 h-2 fill-current opacity-60" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg> */}
                            </Link>
                        </li>
                    ))}
                    {/* <li className="px-3">
                        <button className="text-white/90 hover:text-white font-black text-[13px] flex items-center gap-1">
                            MORE
                            <svg className="w-3 h-3 fill-current opacity-60" viewBox="0 0 24 24">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </button>
                    </li> */}
                </ul>
            </div>

            {/* Mobile Navbar Toggle */}
            <div className="lg:hidden flex items-center py-3">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none"
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 top-[60px] bg-[#003366] z-[100] p-6 lg:hidden">
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.slug}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-xl font-black ${pathname === item.slug
                                        ? 'text-white'
                                        : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

