import Container from '@/components/common/Container';
import { getMetaValueFromExtra_Fields } from '@/utils/metaHelpers';
import Image from 'next/image';

export const metadata = {
    title: 'আমাদের টিম | বাংলা স্টার নিউজ',
    description: 'বাংলা স্টার নিউজ পরিবারের সদস্যবৃন্দ',
};

async function fetchTeamData() {
    try {
        const res = await fetch('https://admin.banglastar.com/api/v1/categories?taxonomy_type=designation&order_by=order_column&order_direction=asc', { next: { revalidate: 60 } });
        if (!res.ok) throw new Error('Failed to fetch categories');
        const json = await res.json();
        const categories = json?.data || [];

        const categoriesWithFullPosts = await Promise.all(
            categories.map(async (category) => {
                const postsWithFullData = await Promise.all(
                    (category?.posts || []).map(async (post) => {
                        if (!post?.slug) return post;
                        try {
                            const postRes = await fetch(`https://admin.banglastar.com/api/v1/post?slug=${post.slug}`, { next: { revalidate: 60 } });
                            if (!postRes.ok) return post;
                            const postJson = await postRes.json();
                            return postJson?.data || post;
                        } catch (e) {
                            return post;
                        }
                    })
                );
                return {
                    ...category,
                    posts: postsWithFullData
                };
            })
        );
        return categoriesWithFullPosts;
    } catch (e) {
        console.error("Error fetching team data:", e);
        return [];
    }
}

// Member card component
function MemberCard({ member, size = 'normal' }) {
    const isLarge = size === 'large';
    const cardWidth = isLarge ? 'w-[160px] md:w-[200px]' : 'w-[120px] md:w-[180px]';
    const imageHeight = isLarge ? 'h-[180px] md:h-[220px]' : 'h-[140px] md:h-[200px]';


    const desgnation = getMetaValueFromExtra_Fields(member, "designation_title");
    // console.log("desgnation", desgnation)

    const imageUrl = member?.featured_image?.startsWith('http')
        ? member.featured_image
        : '/images/img_avatar.png';

    return (
        <div className={`${cardWidth} flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300`}>
            <div className={`relative ${cardWidth} ${imageHeight} border-2 border-slate-300 bg-gray-100 overflow-hidden rounded-sm`}>
                <Image
                    src={imageUrl}
                    alt={member?.name || 'Member'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 120px, 150px"
                />
            </div>
            <div className="mt-2 text-center w-full">
                <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 leading-tight">{member?.name}</h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-tight mt-0.5">{desgnation}</p>
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

export default async function TeamPage() {
    const categories = await fetchTeamData();

    // Use the first category as the head section
    const headCategory = categories.length > 0 ? categories[0] : null;
    const headMembers = headCategory?.posts || [];

    // The rest of the categories
    const otherCategories = categories.slice(1);

    return (
        <main className="bg-[#eff3f6] py-6 md:py-10">
            <Container>

                <div className='flex flex-col items-center'>
                    <span className="text-center text-4xl font-bold text-gray-900 mb-10 pb-2 border-b border-gray-400">আমাদের পরিবার</span>

                    {/* Head / Chief Section */}
                    {headMembers.map((head, index) => {
                        const headImageUrl = head?.featured_image?.startsWith('http')
                            ? head.featured_image
                            : '/images/img_avatar.png';

                        const desgnation = getMetaValueFromExtra_Fields(head, "designation_title");
                        console.log("desgnation", desgnation)

                        return (
                            <div key={index} className="flex flex-col items-center mb-8">
                                <div className="relative w-[180px] md:w-[220px] h-[210px] md:h-[260px] border-3 border-primary bg-gray-100 overflow-hidden rounded-sm shadow-lg">
                                    <Image
                                        src={headImageUrl}
                                        alt={head?.name || 'Head Member'}
                                        fill
                                        className="object-cover"
                                        sizes="220px"
                                        priority
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">{head?.name}</h2>
                                    <p className="text-base md:text-lg text-primary font-semibold">{desgnation}</p>
                                </div>
                            </div>
                        )
                    })}

                    {/* Divider line */}
                    {headMembers.length > 0 && (
                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
                    )}

                    {/* Team Sections */}
                    {otherCategories.map((section, sectionIndex) => {
                        // Hide sections that have no members
                        if (!section?.posts || section.posts.length === 0) return null;

                        return (
                            <div key={sectionIndex} className="mb-8 w-full">
                                <SectionHeader title={section.name} />

                                {/* Members grid */}
                                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6">
                                    {section.posts.map((member, memberIndex) => (
                                        <MemberCard
                                            key={memberIndex}
                                            member={member}
                                            size="normal"
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </main>
    );
}
