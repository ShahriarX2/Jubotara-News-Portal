'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    const handleSearch = (event) => {
        event.preventDefault();

        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setIsExpanded(false);
            return;
        }

        setIsExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!wrapperRef.current?.contains(event.target)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <form onSubmit={handleSearch} className="flex items-center" ref={wrapperRef}>
            <div className="relative flex items-center">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="অনুসন্ধান"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className={`rounded-full border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-red-100 ${
                        isExpanded
                            ? 'w-40 px-4 py-2 sm:w-52 md:w-60'
                            : 'w-0 border-transparent px-0 py-2'
                    }`}
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:border-primary hover:text-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default Search;
