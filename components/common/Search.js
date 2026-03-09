
'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const inputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsExpanded(false);
        } else {
            setIsExpanded(!isExpanded);
            if (!isExpanded) {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
    };

    // Close search bar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target) && !event.target.closest('button')) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex items-center group">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`
                        transition-all duration-300 bg-transparent border-b border-white text-white text-sm focus:outline-none placeholder-white/50 py-1
                        w-40 px-2 sm:w-48
                        lg:w-0 lg:px-0
                        ${isExpanded ? 'lg:w-64 lg:px-2' : ''}
                        lg:group-hover:w-64 lg:group-hover:px-2
                        lg:focus:w-64 lg:focus:px-2
                    `}
                />
                <button
                    type="submit"
                    className="p-2 text-white hover:text-white/80 transition-colors"
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

