'use client';

import { useState } from 'react';
import Search from '../Search';


export default function HeaderActions() {
  const [language, setLanguage] = useState('bn');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  return (
    <div className="flex items-center gap-4">
      <Search />

      <div className="hidden md:flex items-center gap-4">
        {/* <button className="text-white font-bold text-[13px] sm:text-sm md:text-lg hover:underline">
          {language === 'bn' ? 'লগইন' : 'Log In'}
        </button> */}


        <button
          onClick={toggleLanguage}
          className="bg-[#EE1D23] text-white px-4 py-1.5 font-bold text-sm hover:bg-red-700 transition-colors uppercase"
        >
          {language === 'bn' ? 'English' : 'বাংলা'}
        </button>
      </div>
    </div>
  );
}