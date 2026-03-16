
import Link from 'next/link';
import Logo from './Header/Logo';
import Container from './Container';
import { getSettings } from '@/lib/fetchData';
import { getImageUrl, getMediaLinkByMetaName, getMetaValueByMetaName } from '@/utils/metaHelpers';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = async () => {
    const currentYear = new Date().getFullYear();
    const settings = await getSettings()

    const logo = getMediaLinkByMetaName(settings, "site_logoimg_id");
    const email = getMetaValueByMetaName(settings, "company_email") || "nfo@banglastar.com";
    const phone = getMetaValueByMetaName(settings, "company_phone");
    const phone_2 = getMetaValueByMetaName(settings, "phone_2");
    const office_location = getMetaValueByMetaName(settings, "office_location");
    const facebook_url = getMetaValueByMetaName(settings, "facebook_url") || "#";
    const instagram_url = getMetaValueByMetaName(settings, "instagram_url") || "#";
    const twitter_url = getMetaValueByMetaName(settings, "twitter_url") || "#";
    const youtube_url = getMetaValueByMetaName(settings, "youtube_url") || "#";
    const footer_content = getMetaValueByMetaName(settings, "footer_content") || "#"
    const bottom_footer_content = getMetaValueByMetaName(settings, "bottom_footer_content");

    const logoUrl = getImageUrl(logo)
    // console.log({ instagram_url, facebook_url, twitter_url, youtube_url })

    const socialLinks = [
        { icon: FaFacebook, color: "hover:text-[#1877F2]", href: facebook_url },
        { icon: FaYoutube, color: "hover:text-[#FF0000]", href: youtube_url },
        { icon: FaInstagram, color: "hover:text-[#E4405F]", href: instagram_url },
        { icon: FaTwitter, color: "hover:text-[#1DA1F2]", href: twitter_url },
        // { icon: FaPinterest, color: "hover:text-[#BD081C]", href: "https://www.pinterest.com" },
    ];

    // console.log("logo", logoUrl)

    return (
        <footer className="bg-secondary text-white pt-16 pb-4 mt-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 xl:gap-12">
                    {/* About */}
                    <div className="space-y-3 md:space-y-6">
                        <div className="flex bg-white p-1.5 w-fit">
                            <Logo logoUrl={logoUrl} />
                        </div>
                        <div className="text-gray-200 text-base md:text-xl lg:text-xl leading-relaxed">

                            <div dangerouslySetInnerHTML={{ __html: footer_content }} />
                        </div>
                        <div className="flex items-center gap-4">
                            {/* {['facebook', 'twitter', 'youtube', 'instagram'].map((social) => (
                                <a key={social} href="#" className="w-8 h-8 border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                                    <span className="sr-only">{social}</span>
                                    
                                    <div className="w-4 h-4 bg-white/20"></div>
                                </a>
                            ))} */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3 md:space-y-6">
                        <h3 className="text-base md:text-xl  font-bold border-l-4 border-primary pl-3 text-gray-100 ">বিভাগসমূহ</h3>
                        <ul className="grid grid-cols-2 gap-2 text-base md:text-lg lg:text-xl text-gray-200 ">
                            <li><Link href="/category/national" className="hover:text-white transition-colors">জাতীয়</Link></li>
                            <li><Link href="/category/politics" className="hover:text-white transition-colors">রাজনীতি</Link></li>
                            <li><Link href="/category/international" className="hover:text-white transition-colors">আন্তর্জাতিক</Link></li>
                            <li><Link href="/category/sports" className="hover:text-white transition-colors">খেলা</Link></li>
                            <li><Link href="/category/entertainment" className="hover:text-white transition-colors">বিনোদন</Link></li>
                            <li><Link href="/category/lifestyle" className="hover:text-white transition-colors">লাইফস্টাইল</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-3 md:space-y-6">
                        <h3 className="text-base md:text-xl font-bold border-l-4 border-primary pl-3 text-gray-100">প্রতিষ্ঠান</h3>
                        <ul className="space-y-2 text-base md:text-lg lg:text-xl text-gray-200 ">
                            {/* <li><Link href="/about" className="hover:text-white transition-colors">আমাদের সম্পর্কে</Link></li> */}
                            <li><Link href="/team" className="hover:text-white transition-colors">আমাদের টিম</Link></li>
                            {/* <li><Link href="/contact" className="hover:text-white transition-colors">যোগাযোগ</Link></li> */}
                            <li><Link href="/privacy" className="hover:text-white transition-colors">গোপনীয়তা নীতি</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">ব্যবহারের শর্তাবলী</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 md:space-y-6">
                        <h3 className="text-base md:text-xl font-bold border-l-4 border-primary pl-3 text-gray-100">যোগাযোগ</h3>
                        <div className="text-base md:text-lg lg:text-xl text-gray-200 space-y-2">
                            <p>{office_location}</p>
                            <p>ফোন: {phone}</p>
                            <p>ইমেইল: {email}</p>
                        </div>
                        {/* <p className="font-semibold mb-3 text-sm tracking-wide text-white">SOCIAL LINKS</p> */}
                        <div className="flex items-center gap-4 text-xl">
                            {socialLinks.map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    className={`${social.color} text-white transition`}
                                >
                                    <social.icon />
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-3 pt-4 border-t border-gray-600 text-center text-base md:text-lg text-gray-200 ">
                    {/* <p>© {currentYear} বাংলা স্টার নিউজ | সর্বস্বত্ব সংরক্ষিত।</p> */}
                    <p dangerouslySetInnerHTML={{ __html: bottom_footer_content }} />

                </div>
            </Container>
        </footer>
    );
};

export default Footer;
