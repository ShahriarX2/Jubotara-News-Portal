'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

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
  const router = useRouter();

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  useEffect(() => {
    const fetchDivisions = async () => {
      setLoadingDivisions(true);
      try {
        const res = await axiosInstance.get('locations/divisions');
        console.log("res", res.data)
        if (res.data.success) {
          setDivisions(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching divisions:', error);
      } finally {
        setLoadingDivisions(false);
      }
    };

    fetchDivisions();
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          const res = await axiosInstance.get(`locations/districts?division_id=${selectedDivision}`);
          if (res.data.success) {
            setDistricts(res.data.data);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        } finally {
          setLoadingDistricts(false);
        }
      };

      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedDivision]);

  const handleSearch = () => {
    if (!selectedDivision) return;

    const params = new URLSearchParams();
    params.append('division_id', selectedDivision);
    if (selectedDistrict) params.append('district_id', selectedDistrict);

    router.push(`/location?${params.toString()}`);
  };

  return (
    <div className="border  p-2 border-slate-300 md:p-3 lg:p-5 rounded-sm shadow-sm h-full flex flex-col justify-between">

      <div>
        <h3 className="text-xl md:text-2xl font-bold text-secondary  border-b  border-gray-100 flex items-center justify-center">
          সারাদেশ
        </h3>

        <div className="space-y-3">
          {/* Division */}
          <div>
            <label className=" text-base md:text-lg font-semibold text-secondary mb-1">
              বিভাগ
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDivision(value);
                setSelectedDistrict('');
              }}
              disabled={loadingDivisions}
              className="w-full p-2.5 bg-[#eff3f6] border border-gray-300 text-gray-900 text-base focus:ring-blue-500 focus:border-blue-500 block focus:outline-none"
            >
              <option value="">{loadingDivisions ? 'লোড হচ্ছে...' : 'বিভাগ নির্বাচন করুন'}</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.bn_name || div.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="text-base md:text-lg font-semibold text-secondary mb-1">
              জেলা
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedDistrict(value);
              }}
              disabled={!selectedDivision || loadingDistricts}
              className="w-full p-2.5 bg-[#eff3f6] border border-gray-300 text-gray-900 text-base focus:ring-blue-500 focus:border-blue-500 block disabled:opacity-50 focus:outline-none"
            >
              <option value="">{loadingDistricts ? 'লোড হচ্ছে...' : 'জেলা নির্বাচন করুন'}</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.bn_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={!selectedDivision}
        className="mt-3 md:mt-6 w-full bg-secondary hover:bg-secondary text-white font-bold py-2 px-3 md:py-3 md:px-4 flex items-center justify-center gap-2 transition-colors uppercase
         tracking-wider "
      >
        <SearchIcon />
        অনুসন্ধান করুন
      </button>
    </div>
  );
};

export default LocationSearch;
