'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = ({ news_categories }) => {
    const pathname = usePathname();

    return (
        <nav className="relative">
            <div className="hidden lg:flex items-center">
                <ul className="flex items-start">
                    {news_categories?.map((item) => {
                        const href = item?.href || `/category/${item?.slug}`;
                        return (
                            <li key={item?.id || item?.slug} className="relative group">
                                <Link
                                    href={href}
                                    className={`px-3 py-4 text-[13px] sm:text-sm md:text-xl font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1 ${
                                        pathname === href
                                            ? 'text-black underline decoration-2 underline-offset-8'
                                            : 'text-black/90 hover:text-black'
                                    }`}
                                >
                                    {item?.name}
                                </Link>
                            </li>
                        );
                    })}
                    <li className="relative group">
                        <Link
                            href="/video"
                            className={`px-3 py-4 text-[13px] sm:text-sm md:text-xl font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1 ${
                                pathname === '/video'
                                    ? 'text-black underline decoration-2 underline-offset-8'
                                    : 'text-black/90 hover:text-black'
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
