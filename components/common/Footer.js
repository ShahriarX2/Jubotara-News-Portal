import { getSettings, getFeaturedCategories } from "@/lib/fetchData";
import {
  getMediaLinkByMetaName,
  getMetaValueByMetaName,
} from "@/utils/metaHelpers";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import Container from "./Container";
import Logo from "./Header/Logo";
import NewsletterSection from "./NewsletterSection";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const settings = await getSettings();
  const categories = await getFeaturedCategories();

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
    "w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-slate-300 hover:bg-primary hover:text-white transition-all duration-300 border border-slate-800 hover:border-primary";

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 mt-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-2 rounded w-1/2 mx-auto">
              <Logo logoUrl={logoUrl} className="h-20 w-44 mx-auto" />
            </div>
            <p className="text-base text-center leading-relaxed">
              {aboutText ||
                "দেশ-বিদেশের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, খেলাধুলা এবং বিনোদনের নির্ভরযোগ্য সূত্র। সারা বাংলাদেশের প্রতিটি প্রান্তের সঠিক খবর সবার আগে পৌঁছে দিতে আমরা অঙ্গীকারবদ্ধ।"}
            </p>
            <div className="flex justify-center items-center gap-3">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                  aria-label="Youtube"
                >
                  <FaYoutube size={18} />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkClass}
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white text-xl font-bold border-l-4 border-primary pl-3">
              বিভাগসমূহ
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {categories.length > 0 ? (
                categories.slice(0, 10).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="/category/জাতীয়"
                      className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      জাতীয়
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/রাজনীতি"
                      className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      রাজনীতি
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/আন্তর্জাতিক"
                      className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      আন্তর্জাতিক
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/খেলা"
                      className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      খেলা
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/বিনোদন"
                      className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      বিনোদন
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white text-xl font-bold border-l-4 border-primary pl-3">
              প্রতিষ্ঠান
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/team"
                  className="hover:text-primary transition-colors duration-200"
                >
                  আমাদের টিম
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors duration-200"
                >
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors duration-200"
                >
                  গোপনীয়তা নীতি
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors duration-200"
                >
                  ব্যবহারের শর্তাবলী
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <h3 className="text-white text-xl font-bold border-l-4 border-primary pl-3">
                যোগাযোগ
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm xl:text-base">
                  <HiOutlineLocationMarker
                    className="text-primary mt-1 shrink-0"
                    size={20}
                  />
                  <span>
                    {address || "পশ্চিম পাড়া, গাইবান্ধা সদর, গাইবান্ধা।"}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm xl:text-base">
                  <HiOutlinePhone className="text-primary shrink-0" size={20} />
                  <span>{phone || "০১৩১৫-০৪৩৩৬১"}</span>
                </li>
                <li className="flex items-center gap-3 text-sm xl:text-base">
                  <HiOutlineMail className="text-primary shrink-0" size={20} />
                  <span className="break-all">
                    {email || "jubotaranews@gmail.com"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold">নিউজলেটার</h3>
              <NewsletterSection compact={true} textColor="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 text-center md:flex md:justify-between md:text-left items-center">
          <p className="text-sm">
            © {currentYear}{" "}
            <span className="text-white font-semibold">যুবতারা নিউজ</span> |
            সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end gap-6 text-sm">
            <Link
              href="/sitemap.xml"
              className="hover:text-white transition-colors"
            >
              সাইটম্যাপ
            </Link>
            <Link
              href="/rss.xml"
              className="hover:text-white transition-colors"
            >
              আরএসএস
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
