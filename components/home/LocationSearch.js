'use client';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LocationSearch = () => {
  return (
    <div className="border p-2 border-slate-300 md:p-3 lg:p-5 rounded-sm shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-secondary border-b border-gray-100 flex items-center justify-center">
          সারাদেশ
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-base md:text-lg font-semibold text-secondary mb-1">
              বিভাগ
            </label>
            <select
              disabled
              className="w-full p-2.5 bg-[#eff3f6] border border-gray-300 text-gray-500 text-base block disabled:opacity-70 focus:outline-none"
            >
              <option>শীঘ্রই আসছে</option>
            </select>
          </div>

          <div>
            <label className="text-base md:text-lg font-semibold text-secondary mb-1">
              জেলা
            </label>
            <select
              disabled
              className="w-full p-2.5 bg-[#eff3f6] border border-gray-300 text-gray-500 text-base block disabled:opacity-70 focus:outline-none"
            >
              <option>শীঘ্রই আসছে</option>
            </select>
          </div>
        </div>

        <p className="mt-3 text-sm md:text-base text-gray-600">
          লোকেশনভিত্তিক সংবাদ API এখনও public contract-এ যোগ হয়নি।
        </p>
      </div>

      <button
        disabled
        className="mt-3 md:mt-6 w-full bg-gray-400 text-white font-bold py-2 px-3 md:py-3 md:px-4 flex items-center justify-center gap-2 uppercase tracking-wider cursor-not-allowed"
      >
        <SearchIcon />
        অনুসন্ধান করুন
      </button>
    </div>
  );
};

export default LocationSearch;
