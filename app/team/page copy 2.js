import Container from '@/components/common/Container';
import Image from 'next/image';

export const metadata = {
    title: 'আমাদের টিম | বাংলা স্টার নিউজ',
    description: 'বাংলা স্টার নিউজ পরিবারের সদস্যবৃন্দ',
};

// Team data organized by sections
const teamData = {
    head: {
        name: 'তানভীর আহমেদ',
        designation: 'সম্পাদক ও প্রকাশক',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    sections: [
        {
            title: 'উপদেষ্টা পরিষদ',
            members: [
                { name: 'আব্দুল করিম', designation: 'প্রধান উপদেষ্টা', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'রহিমা বেগম', designation: 'উপদেষ্টা', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
                { name: 'মোস্তাফিজুর রহমান', designation: 'উপদেষ্টা', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'কামরুল হাসান', designation: 'উপদেষ্টা', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
                { name: 'সালমা খাতুন', designation: 'উপদেষ্টা', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop' },
            ],
        },
        {
            title: 'সম্পাদনা বিভাগ',
            members: [
                { name: 'ফারহানা রহমান', designation: 'বার্তা সম্পাদক', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
                { name: 'মাহমুদ হাসান', designation: 'প্রধান প্রতিবেদক', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'নাসরিন সুলতানা', designation: 'ফিচার এডিটর', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop' },
                { name: 'তানভীর আহমেদ', designation: 'সিনিয়র সাব-এডিটর', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'সায়মা আক্তার', designation: 'সাব-এডিটর', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
                { name: 'রাশেদ চৌধুরী', designation: 'সাব-এডিটর', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
                { name: 'শাহিন আলম', designation: 'সাব-এডিটর', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
            ],
        },
        {
            title: 'রিপোর্টিং বিভাগ',
            members: [
                { name: 'আরিফুল ইসলাম', designation: 'সিনিয়র রিপোর্টার', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'ফাতেমা জান্নাত', designation: 'রিপোর্টার', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
                { name: 'মিজানুর রহমান', designation: 'রিপোর্টার', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'সুমন দাস', designation: 'রিপোর্টার', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
                { name: 'জাহিদ হাসান', designation: 'রিপোর্টার', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
                { name: 'নাফিসা ইসলাম', designation: 'রিপোর্টার', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop' },
            ],
        },
        {
            title: 'ফটো ও ভিডিও বিভাগ',
            members: [
                { name: 'রাকিব হাসান', designation: 'চিফ ফটোগ্রাফার', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'সায়মা আক্তার', designation: 'ভিজুয়াল এডিটর', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
                { name: 'তৌহিদ ইকবাল', designation: 'ভিডিওগ্রাফার', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'আশিকুর রহমান', designation: 'ফটোগ্রাফার', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
            ],
        },
        {
            title: 'অনলাইন বিভাগ',
            members: [
                { name: 'ইমরান হোসেন', designation: 'অনলাইন এডিটর', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'রুবিনা আক্তার', designation: 'সোশ্যাল মিডিয়া ম্যানেজার', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
                { name: 'শাকিল আহমেদ', designation: 'কন্টেন্ট ম্যানেজার', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'তাসনিম জাহান', designation: 'ডিজিটাল মার্কেটার', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop' },
                { name: 'জুবায়ের আলম', designation: 'ওয়েব ডেভেলপার', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
            ],
        },
        {
            title: 'জেলা প্রতিনিধি',
            members: [
                { name: 'আকবর আলী', designation: 'চট্টগ্রাম', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'রফিকুল ইসলাম', designation: 'রাজশাহী', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'মনিরুল হক', designation: 'খুলনা', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
                { name: 'শামীম আহমেদ', designation: 'সিলেট', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
                { name: 'কামাল উদ্দিন', designation: 'বরিশাল', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'আব্দুস সালাম', designation: 'রংপুর', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'নাজমুল হুদা', designation: 'ময়মনসিংহ', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
                { name: 'সাইফুল ইসলাম', designation: 'কুমিল্লা', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
            ],
        },
        {
            title: 'উপজেলা প্রতিনিধি',
            members: [
                { name: 'হাবিবুর রহমান', designation: 'সাভার', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'আনোয়ার হোসেন', designation: 'গাজীপুর', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'দিলদার হোসেন', designation: 'নারায়ণগঞ্জ', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop' },
                { name: 'মাসুদ রানা', designation: 'মানিকগঞ্জ', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
                { name: 'জসিম উদ্দিন', designation: 'টাঙ্গাইল', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop' },
                { name: 'সোহেল রানা', designation: 'নরসিংদী', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
            ],
        },
    ],
};

// Member card component
function MemberCard({ member, size = 'normal' }) {
    const isLarge = size === 'large';
    const cardWidth = isLarge ? 'w-[160px] md:w-[200px]' : 'w-[120px] md:w-[180px]';
    const imageHeight = isLarge ? 'h-[180px] md:h-[220px]' : 'h-[140px] md:h-[200px]';

    return (
        <div className={`${cardWidth} flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300`}>
            <div className={`relative ${cardWidth} ${imageHeight} border-2 border-slate-300 bg-gray-100 overflow-hidden rounded-sm`}>
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 120px, 150px"
                />
            </div>
            <div className="mt-2 text-center w-full">
                <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 leading-tight">{member.name}</h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-tight mt-0.5">{member.designation}</p>
            </div>
        </div>
    );
}

// Section header component
function SectionHeader({ title }) {
    return (
        <div className="flex justify-center mb-6 mt-10">
            <div className="relative">
                <div className="bg-gradient-to-r from-[#1a3a5c] via-[#1e4d7b] to-[#1a3a5c] text-white px-8 md:px-16 py-2.5 text-lg md:text-xl font-bold text-center rounded-sm shadow-md">
                    {title}
                </div>
                {/* Decorative triangle at bottom */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#1e4d7b]"></div>
            </div>
        </div>
    );
}

export default function TeamPage() {
    return (
        <main className="bg-[#eff3f6] py-6 md:py-10">
            <Container>

                <div className='flex flex-col items-center'>
                    <span className="text-center text-4xl font-bold text-gray-900 mb-10 pb-2 border-b border-gray-400">আমাদের পরিবার</span>
                    {/* Head / Chief Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-[180px] md:w-[220px] h-[210px] md:h-[260px] border-3 border-primary bg-gray-100 overflow-hidden rounded-sm shadow-lg">
                            <Image
                                src={teamData.head.image}
                                alt={teamData.head.name}
                                fill
                                className="object-cover"
                                sizes="220px"
                                priority
                            />
                        </div>
                        <div className="mt-3 text-center">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{teamData.head.name}</h2>
                            <p className="text-base md:text-lg text-primary font-semibold">{teamData.head.designation}</p>
                        </div>
                    </div>

                    {/* Divider line */}
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>

                    {/* Team Sections */}
                    {teamData?.sections?.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-8">
                            <SectionHeader title={section.title} />

                            {/* Members grid */}
                            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6">
                                {section.members.map((member, memberIndex) => (
                                    <MemberCard
                                        key={memberIndex}
                                        member={member}
                                        size="normal"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}
