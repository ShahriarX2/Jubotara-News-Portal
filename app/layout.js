import localFont from "next/font/local";
import "./globals.css";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer";
import { getFeaturedCategories } from "@/lib/fetchData";

const solaimanLipi = localFont({
  src: "../public/fonts/SolaimanLipi.ttf",
  variable: "--font-solaiman-lipi",
  display: 'swap',
});

export const metadata = {
  title: "Bangla Star News | সর্বশেষ সংবাদ ও ব্রেকিং নিউজ",
  description: "বাংলাদেশের অন্যতম নির্ভরযোগ্য অনলাইন সংবাদ মাধ্যম। সর্বশেষ জাতীয়, রাজনীতি, আন্তর্জাতিক, খেলাধুলা ও বিনোদন সংবাদ পেতে আমাদের সাথেই থাকুন।",
};

export default async function RootLayout({ children }) {

  const news_categories = await getFeaturedCategories()
  return (
    <html lang="bn" className={`${solaimanLipi.variable} font-sans`}>
      <body className=" bg-[#eff3f6] pb-16 md:pb-0">
        <Header />
        {children}
        <MobileBottomNav news_categories={news_categories} />
        <Footer />
      </body>
    </html>
  );
}
