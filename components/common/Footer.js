import { getSettings } from "@/lib/fetchData";
import { getMediaLinkByMetaName, getMetaValueByMetaName } from "@/utils/metaHelpers";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Container from "./Container";
import Logo from "./Header/Logo";
import NewsletterSection from "./NewsletterSection";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const settings = await getSettings();
  const logoUrl = getMediaLinkByMetaName(settings, "site_logoimg_id");
  const aboutText = getMetaValueByMetaName(settings, "footer_content");
  const address = getMetaValueByMetaName(settings, "office_location");
  const phone = getMetaValueByMetaName(settings, "company_phone");
  const email = getMetaValueByMetaName(settings, "company_email");
  const facebookUrl = getMetaValueByMetaName(settings, "facebook_url");
  const twitterUrl = getMetaValueByMetaName(settings, "twitter_url");
  const youtubeUrl = getMetaValueByMetaName(settings, "youtube_url");
  const instagramUrl = getMetaValueByMetaName(settings, "instagram_url");

  const socialLinkClass =
    "w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-full text-gray-700";

  return (
    <footer className="mt-12 border-t border-gray-100 bg-white text-black transition-colors">
      <div className="pb-8 pt-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 xl:gap-16">
          <div className="space-y-4 md:space-y-6 lg:col-span-4 sm:col-span-2">
            <div className="flex w-fit p-1.5">
              <Logo logoUrl={logoUrl} className="h-14 w-36 md:h-20 md:w-48"/>
            </div>
            <div className="whitespace-pre-line text-base leading-relaxed text-gray-700 md:text-lg">
              {aboutText || "দেশ-বিদেশের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, খেলাধুলা এবং বিনোদনের নির্ভরযোগ্য সূত্র। সারা বাংলাদেশের প্রতিটি প্রান্তের সঠিক খবর সবার আগে পৌঁছে দিতে আমরা অঙ্গীকারবদ্ধ।"}
            </div>
            <div className="flex items-center gap-4">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FaFacebookF size={18} />
                </a>
              )}
              {twitterUrl && (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FaTwitter size={18} />
                </a>
              )}
              {youtubeUrl && (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FaYoutube size={18} />
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={socialLinkClass}>
                  <FaInstagram size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 lg:col-span-2 sm:col-span-1">
            <h3 className="border-l-4 border-primary pl-3 text-base font-bold text-gray-800 md:text-xl">
              বিভাগসমূহ
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-base text-gray-700 md:text-lg">
              <li><Link href="/category/জাতীয়" className="transition-colors hover:text-primary">জাতীয়</Link></li>
              <li><Link href="/category/রাজনীতি" className="transition-colors hover:text-primary">রাজনীতি</Link></li>
              <li><Link href="/category/আন্তর্জাতিক" className="transition-colors hover:text-primary">আন্তর্জাতিক</Link></li>
              <li><Link href="/category/খেলা" className="transition-colors hover:text-primary">খেলা</Link></li>
              <li><Link href="/category/বিনোদন" className="transition-colors hover:text-primary">বিনোদন</Link></li>
              <li><Link href="/category/জীবনযাপন" className="transition-colors hover:text-primary">জীবনযাপন</Link></li>
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6 lg:col-span-2 sm:col-span-1">
            <h3 className="border-l-4 border-primary pl-3 text-base font-bold text-gray-800 md:text-xl">
              প্রতিষ্ঠান
            </h3>
            <ul className="space-y-2 text-base text-gray-700 md:text-lg">
              <li><Link href="/team" className="transition-colors hover:text-primary">আমাদের টিম</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-primary">যোগাযোগ</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-primary">গোপনীয়তা নীতি</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-primary">ব্যবহারের শর্তাবলী</Link></li>
            </ul>
          </div>

            <div className="space-y-4 md:space-y-6 lg:col-span-4 sm:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="border-l-4 border-primary pl-3 text-base font-bold text-gray-800 md:text-xl">
                    নিউজলেটার
                  </h3>
                  <NewsletterSection compact={true} />
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h3 className="border-l-4 border-primary pl-3 text-base font-bold text-gray-800 md:text-xl">
                    যোগাযোগ
                  </h3>
                  <div className="space-y-2 text-base text-gray-700 md:text-lg">
                    <p>{address || "পশ্চিম পাড়া, গাইবান্ধা সদর, গাইবান্ধা।"}</p>
                    <p>ফোন: {phone || "০১৩১৫-০৪৩৩৬১"}</p>
                    <p>ইমেইল: {email || "jubotaranews@gmail.com"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-base text-gray-700 md:text-lg">
          <p>© {currentYear} যুবতারা নিউজ | সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </Container>
      </div>
    </footer>
  );
};

export default Footer;
